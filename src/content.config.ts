import { existsSync } from 'node:fs';
import { join, normalize, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));

const optionalString = z.preprocess((value) => {
    if (typeof value === 'string' && value.trim() === '') {
        return undefined;
    }

    return value;
}, z.string().trim().optional());

const imagePath = optionalString
    .refine((value) => !value || value.startsWith('/'), 'Featured image must use a public path such as /media/example.jpg.')
    .refine((value) => {
        if (!value) {
            return true;
        }

        const normalizedPath = normalize(value.slice(1));
        const resolvedPath = join(publicDir, normalizedPath);

        return !relative(publicDir, resolvedPath).startsWith('..') && existsSync(resolvedPath);
    }, 'Featured image must point to a file that exists in public/.')
    .refine((value) => {
        if (!value) {
            return true;
        }

        return /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(value);
    }, 'Featured image must be an image file.');

const newsSchema = z
    .object({
        title: z.string().trim().min(1, 'Title is required.'),
        category: z.enum(['Events', 'Street Action', 'Announcements', 'Campaigns']),
        hide_title: z.boolean().optional().default(false),
        date: z.coerce.date(),
        end_date: z.preprocess((value) => {
            if (typeof value === 'string' && value.trim() === '') {
                return undefined;
            }

            return value;
        }, z.coerce.date().optional()),
        pinned: z.boolean().optional().default(false),
        location: optionalString,
        synopsis: z.string().trim().min(1, 'Synopsis is required.'),
        featured_image: imagePath,
    })
    .superRefine((data, context) => {
        if (data.end_date && data.end_date < data.date) {
            context.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'End date must be the same as or later than the start date.',
                path: ['end_date'],
            });
        }
    });

const defineNewsCollection = (base: string) =>
    defineCollection({
        loader: glob({ base, pattern: '**/*.{md,mdx}' }),
        schema: newsSchema,
    });

export const collections = {
    news: defineNewsCollection('./src/content/news'),
    newsArchive: defineNewsCollection('./src/content/archive'),
};

import { getCollection, render } from 'astro:content';

type NewsCollectionName = 'news' | 'newsArchive';

type NewsEntry = Awaited<ReturnType<typeof getCollection>>[number];

type GetNewsPostsOptions = {
    includeArchive?: boolean;
};

const getSlugFromId = (id: string) => {
    const slug = id.split('/').at(-1) ?? id;

    return slug.replace(/\.mdx?$/, '');
};

const getNewsCollectionPosts = async (collection: NewsCollectionName) => {
    const entries = await getCollection(collection);

    return Promise.all(
        entries.map(async (entry: NewsEntry) => {
            const { Content } = await render(entry);

            return {
                ...entry,
                Content,
                default: Content,
                frontmatter: entry.data,
                slug: getSlugFromId(entry.id),
                archived: collection === 'newsArchive',
            };
        })
    );
};

export const getNewsPosts = async ({ includeArchive = false }: GetNewsPostsOptions = {}) => {
    const activePosts = await getNewsCollectionPosts('news');

    if (!includeArchive) {
        return activePosts;
    }

    const archivedPosts = await getNewsCollectionPosts('newsArchive');

    return [...activePosts, ...archivedPosts];
};

export const getCategoryPath = (category: string) => {
    if (category === 'Street Action') {
        return '/street-action';
    }

    if (category === 'Events') {
        return '/events';
    }

    if (category === 'Campaigns') {
        return '/campaigns';
    }

    return '/announcements';
};

// Pinned posts first, then newest publish date first
export const compareAnnouncements = (a: any, b: any) => {
    const pinnedDifference = Number(Boolean(b.frontmatter.pinned)) - Number(Boolean(a.frontmatter.pinned));

    if (pinnedDifference !== 0) {
        return pinnedDifference;
    }

    return new Date(b.frontmatter.date).valueOf() - new Date(a.frontmatter.date).valueOf();
};

export const getPostHref = (post: { frontmatter: { category: string }; slug: string }) => {
    return `${getCategoryPath(post.frontmatter.category)}#${post.slug}`;
};

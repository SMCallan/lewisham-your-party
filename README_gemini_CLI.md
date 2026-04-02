# Project Overview: Lewisham Your Party

This project is the digital home for **Lewisham Your Party**, built using a modern web stack focused on performance, bold design, and content-driven architecture.

## 🛠 Tech Stack

- **Framework:** [Astro 6.0](https://astro.build/) (Static Site Generator)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Frontend Library:** [React 19](https://react.dev/) (Integrated via `@astrojs/react`)
- **Forms:** [Web3Forms](https://web3forms.com/) for serverless form submissions.
- **Content:** Markdown-based content management.

## 🎨 Design System & Style

The project follows a specific visual identity:
- **Colors:**
  - `yp-red`: `#ea433b` (Primary brand color)
  - `yp-slate`: `#22383f` (Primary dark/text color)
  - `yp-cream`: `#f4efeb` (Primary background color)
- **Typography:**
  - **Headings:** Bold, condensed style using `Impact` or `Arial Black`.
  - **Body:** Standard sans-serif stack via Tailwind defaults.
- **Aesthetic:** High-contrast, "political flyer" style with heavy borders and uppercase headings.

## 📂 Project Structure

- `src/pages/`: Contains all site routes (Home, About, Campaigns, Events, etc.).
- `src/content/news/`: The primary "database" of the site. All news, events, and announcements are stored here as Markdown files.
- `src/layouts/Layout.astro`: The main wrapper containing the `<head>`, SEO meta tags, and global Footer.
- `src/styles/global.css`: Tailwind 4.0 configuration and custom `@theme` variables.
- `public/media/`: Stores images used in content posts and campaigns.

## 🚀 Key Features

### 1. Dynamic Content Feeds
The site uses `import.meta.glob` to dynamically fetch and sort content from `src/content/news/`.
- **Homepage:** Features a "Dual Feed Dashboard" splitting Events/Street Action from Announcements.
- **Campaigns:** A dedicated feed for political platforms and manifestos.
- **Filtering:** Content is filtered by frontmatter categories (`Events`, `Street Action`, `Announcements`, `Campaigns`).

### 2. Smart Signup Form
The homepage includes a sophisticated signup form:
- Integrates with **Web3Forms**.
- **Dynamic Redirection:** Uses a client-side script to change the success redirect URL based on whether the user is already a national member.
- **GDPR Compliant:** Includes consent checkboxes.

### 3. SEO & Social Sharing
- Pre-configured Open Graph tags in `Layout.astro`.
- Automatic sitemap generation via `@astrojs/sitemap`.
- Configured for the domain: `https://lewishamyourparty.org.uk`.

## 📝 Content Management (CMS)

To add new content, create a `.md` file in `src/content/news/` with the following frontmatter:

```markdown
---
title: Post Title
category: Events | Street Action | Announcements | Campaigns
date: YYYY-MM-DD
location: Optional Location
featured_image: /media/your-image.jpg
hide_title: false (Optional: set to true for graphic-heavy posts)
---
Your content here in Markdown.
```

## 🤖 Gemini CLI Insights

- The project uses the latest Tailwind 4.0 syntax (CSS-first configuration).
- The use of `import.meta.glob` indicates a preference for simplicity over Astro's formal Content Collections API, allowing for easier "quick-and-dirty" content management without schema strictness.
- The site is highly accessible, using semantic HTML and ARIA labels in the footer.

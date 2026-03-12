![Your_Party_logo](https://github.com/user-attachments/assets/886de2e4-a145-47da-9694-f2f5a3d28383)


# Welcome to the official code repository for the Lewisham branch of Your Party. 

This website is custom-built to be blazing fast, entirely free to host, and virtually impossible to hack. Instead of using a bloated system like WordPress, we use a modern **Jamstack** architecture. 

---

## 🏗️ How It Works (The Architecture)

* **The Framework:** Built with [Astro](https://astro.build/) and React. It writes modern JavaScript but delivers pure, lightning-fast static HTML to the user's browser.
* **The Styling:** Powered by **Tailwind CSS v4**. All of our official constructivist colors (YP Red, Slate, Cream) are baked directly into the CSS.
* **The Database:** We don't have one! All "News Updates" are saved as simple text files (Markdown) right here in this repository. 
* **The Hosting:** Hosted on **Cloudflare Pages**. It utilizes enterprise-grade DDoS protection. 
* **The Automation:** Every time code is changed or a news article is published, Cloudflare automatically rebuilds the site and pushes it live to the `.org.uk` domain in seconds.

---

## ✍️ For Admins: How to Publish News

If you are an admin or content creator, **you do not need to touch any code or understand GitHub.** We use a user-friendly system called [Pages CMS](https://pagescms.org) that sits on top of this code.

**To write an update:**
1. Go to **[PagesCMS.org](https://pagescms.org)** and click "Log in with GitHub".
2. Select the `lewisham-your-party` repository.
3. Click on **News Updates** in the left sidebar.
4. Click **New Entry**.
5. Fill out your title, date, and write your article in the rich-text editor. You can easily add bold text, links, and drop in images.
6. Click **Save / Publish**.

*That's it! Wait about 30 seconds, and Cloudflare will automatically update the live website.*

---

## 💻 For Developers: How to Edit the Site

If you want to change the layout, add new pages, or tweak the colors, here is where everything lives:

### Folder Structure
* `src/pages/` - This is where the actual web pages live (like `index.astro` for the homepage).
* `src/content/news/` - This is where Pages CMS automatically saves the Markdown files for the news feed.
* `src/styles/global.css` - This is where our official Tailwind v4 color variables are defined.
* `public/images/` - This is where any images uploaded by admins are stored. 
* `.pages.yml` - The configuration file that tells the admin portal how to look and behave.

### Running the Site Locally

To run this site on your own computer, you will need [Node.js](https://nodejs.org/) installed. 

1. **Clone the repository** to your computer.
2. **Install the dependencies:**
   ```bash
   npm install

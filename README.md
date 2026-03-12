![Your_Party_logo](https://github.com/user-attachments/assets/886de2e4-a145-47da-9694-f2f5a3d28383)

# Welcome to the official code repository for the Lewisham branch of Your Party. 

This website is custom-built to be blazing fast, highly secure, and incredibly easy to manage. Instead of using a bloated system like WordPress, we use a modern **Jamstack** architecture. 

## 🌱 Our Grassroots Tech Ethos

This project is built on the philosophy of a **super cost-effective grassroots tech stack**. We believe political organizing shouldn't require massive digital budgets or expensive monthly software subscriptions. 

The only financial overhead for this entire platform is the annual cost of the `.org.uk` domain name. The hosting, the content management system, the form handlers, and the build pipelines are all entirely free. The true investment here is purely human: our own labor, creativity, and ingenuity. 

---

## 🏗️ How It Works (The Architecture)

* **The Framework:** Built with [Astro](https://astro.build/). It writes modern, component-based code but delivers pure, lightning-fast static HTML to the user's browser.
* **The Styling:** Powered by **Tailwind CSS v4**. All of our official constructivist colors (YP Red, Slate, Cream) are baked directly into the CSS.
* **The Database:** We don't have one! All "News Updates" and "Events" are saved as simple text files (Markdown) right here in this repository. 
* **Forms & Data Collection:** We use **Web3Forms** to handle member signups without needing a backend server. Submissions are securely caught and forwarded to our team. Admins can manage the form endpoints at the [Web3Forms Dashboard](https://app.web3forms.com/dashboard).
* **Hosting & CI/CD Pipeline:** Hosted on **Cloudflare Pages**. We utilize a Continuous Integration/Continuous Deployment (CI/CD) workflow: every time code is changed or a news article is published to the `main` branch, Cloudflare automatically detects it, rebuilds the site from scratch, and pushes it live to the `.org.uk` domain and edge network in seconds.

---

## ✍️ For Admins: How to Publish News & Events

If you are a campaign organizer or coms admin, **you do not need to touch any code or understand GitHub.** We use a user-friendly system called [Pages CMS](https://pagescms.org) that sits directly on top of this code.

**To write an update or schedule an event:**
1. Go to **[PagesCMS.org](https://pagescms.org)** and click "Log in with an associated email".
2. Select the `lewisham-your-party` repository.
3. Click on **Updates & Events** in the left sidebar.
4. Click **New Entry**.
5. Fill out the form. You MUST select a **Category** (Events, Street Action, or Announcements) so the website knows which feed to put it in. You can also add an optional **Location**.
6. Write your article in the rich-text editor (you can easily add bold text, links, and drop in images).
7. Click **Save / Publish**.

*That's it! Wait about 30-60 seconds, and Cloudflare will automatically update the live website feeds.*

---

## 💻 For Developers: How to Contribute

If you want to change the layout, add new pages, or tweak the colors, here is how you can develop locally and contribute to the project.

### Folder Structure
* `src/pages/` - The actual web pages (e.g., `index.astro`, `events.astro`).
* `src/layouts/` - Global page wrappers (where the header, footer, and legal imprint live).
* `src/content/news/` - Where Pages CMS automatically saves the Markdown files for the feeds.
* `src/styles/global.css` - Where our official Tailwind v4 color variables are defined.
* `.pages.yml` - The configuration file that dictates the fields in the Pages CMS admin portal.

### Local Development Workflow
To run this site on your own computer, you will need [Node.js](https://nodejs.org/) installed. 

**1. Fork & Clone the repository:**
First, click the "Fork" button at the top of this GitHub repository to make your own copy. Then, open your computer's terminal and run:
~~~bash
git clone https://github.com/YOUR-USERNAME/lewisham-your-party.git
cd lewisham-your-party
~~~

**2. Install dependencies & Run locally:**
~~~bash
npm install
npm run dev
~~~
*Your terminal will give you a `localhost` link (usually `http://localhost:4321`). Open that in your browser to see the site running locally!*

**3. Make changes, Commit, and Push:**
Once you have made and tested your changes locally, push them back up to GitHub:
~~~bash
git add .
git commit -m "Brief description of the changes you made"
git push origin main
~~~
*(Note: If you are not the main repo owner, you will push to your fork and submit a Pull Request).*

---

## 🚧 Roadmap & TODOs

As our grassroots movement grows, the digital infrastructure needs to grow with it. Here are the immediate next steps being worked on for the site:

- [ ] **Google Sheets Automation:** Route Web3Forms signups to automatically populate a dedicated, secure Google Sheet for the organizing team.
- [ ] **Expand Data Collection:** Update the HTML form to capture standard political data points alongside the email address (e.g., First Name, Last Name, Postcode).
- [ ] **Dedicated Admin Emails:** Set up official `@lewishamyourparty.org.uk` email routing for the head organizer, media officer, etc.
- [ ] **Legal Pages:** Create dedicated markdown pages for Privacy Policy, Cookie Policy, and Terms of Service.

# Latter UP — Student Portal

A simple, static student portal website for Latter UP, built to be hosted for
free on GitHub Pages. No build tools, no frameworks — just HTML, CSS, and a
little JavaScript.

## What's included

- **Quick-link cards** to Google Chat, email, and Google Classroom
- **FAQ accordion** — content lives in one easy-to-edit file
- Theme colors matching Latter UP's palette
- Fully responsive (works on phones, tablets, and desktops)

## File structure

```
├── index.html               ← Page structure/content
├── styles.css                ← All styling (colors, fonts, layout)
├── faq-data.js                ← Edit THIS file to add/change FAQ questions
├── announcements-data.js       ← Edit THIS file to add/change announcements
├── script.js                  ← Builds the FAQ/Announcements sections and sets the footer year (rarely needs editing)
└── assets/
    └── favicon.svg              ← Browser tab icon
```

## How to publish this on GitHub Pages (free hosting)

1. **Create a new GitHub repository** (public repos get free Pages hosting).
   - Go to github.com → New repository → name it something like `latterup-portal`.
2. **Upload these files** to the repository.
   - Easiest way: on the repo page, click **Add file → Upload files**, drag in
     all the files/folders from this project, and commit.
3. **Turn on GitHub Pages**.
   - Go to the repo's **Settings** tab → **Pages** (left sidebar).
   - Under "Build and deployment," set **Source** to `Deploy from a branch`.
   - Set **Branch** to `main` (or `master`) and folder to `/ (root)`.
   - Click **Save**.
4. **Wait about 1–2 minutes.** GitHub will give you a live URL that looks like:
   `https://YOUR-USERNAME.github.io/latterup-portal/`
5. Share that link with students and families — that's the portal!

Any time you push new changes to the repo, the live site updates automatically
within a minute or two.

## How to edit Announcements

Open **`announcements-data.js`**. Each announcement is a block like this:

```js
{
  title: "Example announcement title",
  date: "Month Day, Year",
  text: "Your announcement text goes here."
}
```

- **To add an announcement:** copy an existing block, paste it inside the
  list, and change the text.
- **To remove one:** delete its whole block.
- **To edit one:** just change the text between the quotes.
- Add `openByDefault: true` to a block to have it show expanded on page load
  instead of collapsed.

### Updating the Weekly Activity flyer (PDF)

The first item in `announcements-data.js` is reserved for the weekly PDF
flyer and looks like this:

```js
{
  title: "Weekly Activity",
  date: "Updated weekly",
  text: "This week's activity flyer is below...",
  pdfSrc: "flyer.pdf",
  openByDefault: true
}
```

To update it each week:

1. Save your flyer as a PDF, e.g. `flyer.pdf`.
2. Upload that PDF into your GitHub repo, in the same folder as `index.html`
   (or into `assets` if you'd rather keep it tidy — just update `pdfSrc` to
   match, e.g. `"assets/flyer.pdf"`).
3. Make sure `pdfSrc` in `announcements-data.js` matches your file's exact
   name.
4. To reuse the same filename every week, just overwrite `flyer.pdf` with the
   new file — no other changes needed.

## How to edit the FAQ

Open **`faq-data.js`**. Each question is a block that looks like this:

```js
{
  question: "What is Latter UP?",
  answer: "Latter UP is an online, LDS-based co-op..."
}
```

- **To add a question:** copy one of these blocks, paste it inside the list,
  and change the text.
- **To remove a question:** delete its whole block.
- **To edit a question:** just change the text between the quotes.
- You can include a link in an answer like this:
  `"Email us at <a href=\"mailto:you@example.com\">you@example.com</a>."`

You do not need to touch `index.html`, `styles.css`, or `script.js` to update
the FAQ or Announcements — those two data files are the only ones meant to
be edited regularly.

**Important:** at the very bottom of both `faq-data.js` and
`announcements-data.js` there's a line like `window.FAQ_ITEMS = FAQ_ITEMS;`
— don't delete that line. It's what makes the content actually show up on
the page.

## How to update the Chat / Email / Classroom links

Open **`index.html`** and search for the three link buttons inside the
`<section class="links">` block near the top of the file. Each one is an
`<a href="...">` tag:

- Google Chat link → look for `href="https://mail.google.com/chat"`
- Email link → look for `href="mailto:latterup@gmail.com"` (replace
  `latterup@gmail.com` with the real address)
- Google Classroom link → look for `href="https://classroom.google.com"`
  (you can point this at a specific class URL if you'd like)

## How to change the colors or fonts

Open **`styles.css`** and look at the top of the file under `:root`. All the
theme colors are defined there as named variables (`--navy`, `--slate`,
`--cream`, `--stone`, `--gold`), so changing one value updates it everywhere
it's used on the site.

## Testing locally before you publish

You can just double-click `index.html` to open it in a browser, or for a more
accurate local preview, run a simple local server from this folder:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

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
├── index.html       ← Page structure/content — FAQ questions live here too
├── styles.css        ← All styling (colors, fonts, layout)
├── script.js         ← Sets the footer's copyright year (rarely needs editing)
└── assets/
    └── favicon.svg    ← Browser tab icon
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

## How to edit the FAQ

Open **`index.html`** and scroll down to the section that starts with
`<section class="faq" id="faq">`. Each question is a block that looks like
this:

```html
<details class="faq-item">
  <summary class="faq-question">What is Latter UP?</summary>
  <div class="faq-answer">
    <p>Latter UP is an online, LDS-based co-op...</p>
  </div>
</details>
```

- **To add a question:** copy one whole `<details class="faq-item"> ... </details>`
  block, paste it anywhere inside the FAQ list, and change the text.
- **To remove a question:** delete its whole `<details>...</details>` block.
- **To edit a question:** just change the text inside `<summary>` (the
  question) or inside `<p>` (the answer).
- You can include a link in an answer like this:
  `<a href="mailto:you@example.com">you@example.com</a>`

The FAQ expands and collapses automatically — no JavaScript required. This
uses a standard HTML feature (`<details>`/`<summary>`), so it can't silently
break the way a separate script file can.

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

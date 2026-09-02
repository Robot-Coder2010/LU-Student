# Latter UP — Student Portal

A simple, static student portal website for Latter UP, built to be hosted for
free on GitHub Pages. No build tools, no frameworks — just HTML, CSS, and a
little JavaScript.

## What's included

- **Home page** (`index.html`) — quick links, the 2 most recent announcements,
  the 2 most recent videos, and the full FAQ
- **Announcements page** (`announcements.html`) — the full announcements feed,
  newest first, each one collapsible to show details and any attached PDF
- **Videos page** (`videos.html`) — the full video archive, newest first
- Theme colors matching Latter UP's palette
- Fully responsive (works on phones, tablets, and desktops)

## File structure

```
├── index.html                  ← Home page
├── announcements.html           ← Full announcements feed
├── videos.html                   ← Full video archive
├── styles.css                     ← All styling (colors, fonts, layout)
├── faq-data.js                     ← Edit to add/change FAQ questions
├── announcements-data.js            ← Edit to add/change announcements
├── videos-data.js                    ← Edit to add/change videos
├── script.js                          ← Builds all the sections (rarely needs editing)
├── assets/
│   ├── favicon.svg                      ← Browser tab icon
│   └── logo.png                          ← Header logo
├── pdfs/                                  ← Put announcement PDF flyers in here
├── videos/                                ← Put your .mp4 files in here
└── leadership/                             ← Content tool for Student Leadership
    ├── index.html                            ← The tool itself
    ├── leadership.css                         ← Its styling
    └── leadership.js                           ← Its logic
```

**You will only regularly edit three files: `faq-data.js`,
`announcements-data.js`, and `videos-data.js`.** Everything else is
"plumbing" that you shouldn't need to touch.

## How to publish this on GitHub Pages (free hosting)

1. **Create a new GitHub repository** (public repos get free Pages hosting).
   - Go to github.com → New repository → name it something like `latterup-portal`.
2. **Upload these files** to the repository, keeping the same folder
   structure shown above (the `assets` folder and `videos` folder need to
   stay as folders, not get flattened).
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

## How to set up the Calendar section

The home page has a "Calendar" section with an embedded Google Calendar on
the left and a card linking out to Google Calendar on the right. To make
the embed show your actual events:

1. Go to [calendar.google.com](https://calendar.google.com), find the
   calendar you want to show (e.g. an LU events calendar), hover over it in
   the sidebar, click the three-dot menu, and choose **Settings and sharing**.
2. Scroll to **Access permissions for events** and turn on **Make available
   to public** (or share it with "Anyone with the link"). If this isn't
   turned on, the embed will show blank or an error for visitors.
3. Scroll to **Integrate calendar** and copy the **Calendar ID** — it
   usually looks like an email address, e.g.
   `something@group.calendar.google.com`.
4. Open **`index.html`**, find the calendar section (search for
   `YOUR_CALENDAR_ID_HERE`), and replace that placeholder with your real
   Calendar ID.

## Content tool for Student Leadership

There's a page at `leadership/index.html` that helps non-technical Student
Leadership members add or edit announcements and videos without hand-editing
JavaScript. It:

- Isn't linked from anywhere on the main site and won't show up in search
  engines (so it won't be stumbled into by students browsing the portal)
- Lets you paste in the current data file, click an entry to edit it or add
  a new one through a plain form, and generates the correctly-formatted code
  for you to copy back into GitHub

**Important — this is not a real login or security system.** Anyone who has
this exact page's link could open it, since there's no server behind this
site to actually check a password (a static site literally cannot keep a
secret — anything in the page's code is visible to anyone who looks). Treat
the link like a semi-private door, not a locked one: share it only with
Student Leadership, and know that determined guessing or a shared link could
still get someone in. It also doesn't save anything automatically — every
change still has to be manually copied and pasted into the real files on
GitHub and committed, same as editing the files by hand.

Once published, this tool lives at:
`https://YOUR-USERNAME.github.io/latterup-portal/leadership/`

## How to edit Announcements

Open **`announcements-data.js`**. This one file powers BOTH the "Latest
Announcements" preview on the home page (2 most recent) and the full feed
on `announcements.html` — so you only ever update it in one place.

Each announcement is a block like this:

```js
{
  title: "Example announcement title",
  date: "2026-08-26",
  text: "Your announcement text goes here.",
  pdfSrc: "flyer.pdf"
}
```

- **To add an announcement:** copy an existing block, paste it anywhere in
  the list, and change the text. You don't need to worry about putting it
  in the "right" order — the page automatically sorts everything newest
  first based on the date.
- **To remove one:** delete its whole block.
- **To edit one:** just change the text between the quotes.
- **Dates must be in `YYYY-MM-DD` format** (e.g. `"2026-08-26"` for August
  26, 2026) — this is what keeps sorting correct. The page will display it
  to visitors in a friendly format automatically ("August 26, 2026").
- `pdfSrc` is optional — leave it out entirely for announcements with no
  attached flyer.

### Attaching a PDF flyer to an announcement

1. Upload your PDF into the repo — either the root folder (next to
   `index.html`) or the `assets` folder.
2. Add a `pdfSrc` line to that announcement's block with the file's name,
   e.g. `pdfSrc: "flyer.pdf"` or `pdfSrc: "assets/flyer.pdf"`.
3. Each week, you can either add a brand-new announcement block with a new
   PDF, or overwrite an existing PDF file with the same name — both work.

## How to edit Videos

Open **`videos-data.js`**. Just like announcements, this one file powers
both the "Latest Videos" preview on the home page (2 most recent) and the
full archive on `videos.html`.

Each video is a block like this:

```js
{
  title: "August Family Night",
  date: "2026-08-15",
  description: "A short description of the video.",
  videoSrc: "videos/august-family-night.mp4"
}
```

- **To add a video:** copy an existing block, paste it anywhere in the list,
  and change the text — sorting is automatic, newest first, same as
  announcements.
- **To remove one:** delete its whole block.
- **Dates must be in `YYYY-MM-DD` format**, same rule as announcements.

### Uploading an MP4 file

1. Create a folder in your repo called `videos` (if it doesn't exist yet)
   and upload your `.mp4` file into it.
2. Set `videoSrc` to match, e.g. `videoSrc: "videos/august-family-night.mp4"`.

**A note on file size:** GitHub has a 25MB per-file limit when uploading
through the website, and large videos can make the site slow to load. If
your videos are bigger than that, upload them to YouTube instead (an
"Unlisted" video works fine — it won't show up in search, only people with
the link can watch it) and use `youtubeId` instead of `videoSrc`:

```js
{
  title: "August Family Night",
  date: "2026-08-15",
  description: "A short description of the video.",
  youtubeId: "dQw4w9WgXcQ"
}
```

That ID is just the part of the YouTube URL after `v=` (or after
`youtu.be/` for short links). Use either `videoSrc` OR `youtubeId` on a
given video, not both.

## How to edit the FAQ

Open **`faq-data.js`**. This only appears on the home page (`index.html`).
Each question is a block that looks like this:

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

**Important:** at the very bottom of `faq-data.js`, `announcements-data.js`,
and `videos-data.js` there's a line like `window.FAQ_ITEMS = FAQ_ITEMS;` —
don't delete that line in any of them. It's what makes the content actually
show up on the page.

## How to update the Resources & Media links

Open **`index.html`** and search for `<section class="resources"`. Each row
is an `<a class="resource-row" href="...">` tag — change the `href` to point
wherever you'd like (e.g. a specific shared Docs folder instead of the
general Google Docs homepage).

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
it's used across all three pages.

## Testing locally before you publish

You can just double-click `index.html` to open it in a browser, or for a more
accurate local preview, run a simple local server from this folder:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

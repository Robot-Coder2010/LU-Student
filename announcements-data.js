/* ==========================================================================
   Latter UP — Announcements Content
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to add, remove, or change
   announcements — including PDF flyers.

   Used by BOTH index.html (shows the 2 most recent) and announcements.html
   (shows the full feed) — so you only ever update this one file.

   Each entry looks like this:
     {
       title: "Example announcement title",
       date: "2026-08-26",
       text: "Your announcement text goes here.",
       pdfSrc: "flyer.pdf"   <-- optional, remove this line if there's no PDF
     }

   To ADD an announcement:
     Copy an existing { ... } block, paste it anywhere in the list, and
     change the text. New/old order doesn't matter — the page sorts by
     date automatically, newest first.

   To REMOVE an announcement:
     Delete its whole { ... } block (including the comma after it).

   IMPORTANT ABOUT DATES:
     Always use the format YYYY-MM-DD (4-digit year, 2-digit month,
     2-digit day), for example "2026-08-26" for August 26, 2026.
     This format keeps announcements sorted correctly (newest first)
     and is shown to visitors in a friendly format automatically.

   ATTACHING A PDF:
     1. Upload your PDF into the repo (root folder or "assets" folder).
     2. Add a pdfSrc line with the file's name, e.g. pdfSrc: "flyer.pdf"
        or pdfSrc: "assets/flyer.pdf" if it's inside the assets folder.
     3. Leave pdfSrc out entirely for announcements with no attachment.

   Notes:
   - Keep the quotes " " around your text.
   - If your text needs a quote mark, put a backslash before it, like this:
     "This is a \"quoted\" word."
   - The text field supports basic HTML, so you can use <a href="...">
     to add a link, or <br><br> for a paragraph break.
   - Do NOT delete the "window.ANNOUNCEMENT_ITEMS = ANNOUNCEMENT_ITEMS;"
     line at the very bottom — it's what makes this content show up.
   ========================================================================== */

const ANNOUNCEMENT_ITEMS = [
    {
    title: "Weekly Activity - Touch a Temple",
    date: "2026-09-02",
    text: "Replace this text with your announcement. You can write as much as you'd like here, and it will only show once a family clicks to expand it."
  },
  {
    title: "Weekly Activity — Back to School Kickoff",
    date: "2026-08-26",
    text: "This week's activity is a welcome to LU hosted by the board..",
    pdfSrc: "flyer.pdf"
  },
  {
    title: "Another example announcement",
    date: "2026-07-28",
    text: "This is what an older announcement looks like — it'll automatically move further down the feed as newer ones are added."
  }
];

// Make this list available to script.js. (Do not remove this line —
// it's what makes Announcements actually show up on the page.)
window.ANNOUNCEMENT_ITEMS = ANNOUNCEMENT_ITEMS;

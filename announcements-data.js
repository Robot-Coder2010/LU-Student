/* ==========================================================================
   Latter UP — Announcements Content
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to add, remove, or change
   announcements — including the Weekly Activity flyer.

   Each entry is one { ... } block in the list below. There are two kinds:

   1) A normal text announcement:
      {
        title: "Example announcement title",
        date: "Month Day, Year",
        text: "Your announcement text goes here."
      }

   2) The Weekly Activity flyer (has a pdfSrc field, and opens automatically):
      {
        title: "Weekly Activity",
        date: "Updated weekly",
        text: "This week's activity flyer is below...",
        pdfSrc: "flyer.pdf",
        openByDefault: true
      }

   To ADD an announcement:
     Copy an existing { ... } block, paste it before the closing bracket,
     and change the text.

   To REMOVE an announcement:
     Delete its whole { ... } block (including the comma after it).

   To UPDATE the Weekly Activity flyer:
     1. Upload your PDF into the same folder as index.html (the root of the
        repo), or into the "assets" folder if you'd like to keep things tidy.
     2. Change pdfSrc below to match your file's exact name, e.g.
        pdfSrc: "flyer.pdf"  or  pdfSrc: "assets/flyer.pdf"
     3. Each week, just upload a new PDF with the same filename (overwriting
        the old one) and no other changes are needed.

   Notes:
   - Keep the quotes " " around your text.
   - If your text needs a quote mark, put a backslash before it, like this:
     "This is a \"quoted\" word."
   - The text field supports basic HTML, so you can use <a href="...">
     to add a link, or <br><br> for a paragraph break.
   - Set openByDefault: true on any item to have it show expanded by
     default instead of collapsed. Leave it off (or set to false) for
     items that should start collapsed.
   - Do NOT rename ANNOUNCEMENT_ITEMS below — script.js looks for this
     exact name.
   ========================================================================== */

const ANNOUNCEMENT_ITEMS = [
  {
    title: "Weekly Activity",
    date: "Updated weekly",
    text: "This week's activity flyer is below. Tap or click to view it full-screen, or download it to save for later.",
    pdfSrc: "flyer.pdf",
    openByDefault: true
  },
  {
    title: "Example announcement title",
    date: "Month Day, Year",
    text: "Replace this text with your announcement. You can write as much as you'd like here, and it will only show once a family clicks to expand it."
  }
];

// Make this list available to script.js. (Do not remove this line —
// it's what makes Announcements actually show up on the page.)
window.ANNOUNCEMENT_ITEMS = ANNOUNCEMENT_ITEMS;

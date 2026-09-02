/* ==========================================================================
   Latter UP — Videos Content
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to add, remove, or change videos.

   Used by BOTH index.html (shows the 2 most recent) and videos.html
   (shows the full archive) — so you only ever update this one file.

   IMPORTANT ABOUT DATES:
     Always use the format YYYY-MM-DD, for example "2026-08-15" for
     August 15, 2026. This keeps videos sorted correctly.

   Notes:
   - Keep the quotes " " around your text.
   - Do NOT delete the "window.VIDEO_ITEMS = VIDEO_ITEMS;" line at the very
     bottom — it's what makes this content show up.
   ========================================================================== */

const VIDEO_ITEMS = [
  {
    title: "September Video",
    date: "2026-08-15",
    description: "This is our latest video",
    youtubeId: "https://www.youtube.com/shorts/kzTHriM0EUo"
  },
  {
    title: "December SL Video",
    date: "2025-12-15",
    description: "Replace this with a short description of what's in the video.",
    videoSrc: "videos/video.mp4"
  }
];

// Make this list available to script.js. (Do not remove this line —
// it's what makes Videos actually show up on the page.)
window.VIDEO_ITEMS = VIDEO_ITEMS;

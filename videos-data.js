/* ==========================================================================
   Latter UP — Videos Content
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to add, remove, or change videos.

   Used by BOTH index.html (shows the 2 most recent) and videos.html
   (shows the full archive) — so you only ever update this one file.

   Each entry looks like this:
     {
       title: "August Family Night",
       date: "2026-08-15",
       description: "A short description of the video.",
       videoSrc: "videos/august-family-night.mp4"
     }

   To ADD a video:
     Copy an existing { ... } block, paste it anywhere in the list, and
     change the text. New/old order doesn't matter — the page sorts by
     date automatically, newest first.

   To REMOVE a video:
     Delete its whole { ... } block (including the comma after it).

   IMPORTANT ABOUT DATES:
     Always use the format YYYY-MM-DD (4-digit year, 2-digit month,
     2-digit day), for example "2026-08-15" for August 15, 2026.
     This format keeps videos sorted correctly (newest first) and is
     shown to visitors in a friendly format automatically.

   UPLOADING A VIDEO FILE:
     1. Create a folder in your repo called "videos" (if it doesn't exist
        yet) and upload your .mp4 file into it.
        NOTE: GitHub has a 25MB per-file limit when uploading through the
        website, and GitHub Pages works best with smaller video files.
        If your videos are large, consider uploading them to YouTube
        (unlisted is fine) and using the YouTube link instead — see the
        "Using YouTube instead of an MP4 file" note below.
     2. Set videoSrc to match the file's path, e.g.
        videoSrc: "videos/august-family-night.mp4"

   USING YOUTUBE INSTEAD OF AN MP4 FILE:
     If your video is hosted on YouTube, use youtubeId instead of videoSrc:
       youtubeId: "dQw4w9WgXcQ"
     (That's just the part of the YouTube URL after "v=" or after
     "youtu.be/".) Use ONE or the other, not both.

   Notes:
   - Keep the quotes " " around your text.
   - If your text needs a quote mark, put a backslash before it, like this:
     "This is a \"quoted\" word."
   - Do NOT delete the "window.VIDEO_ITEMS = VIDEO_ITEMS;" line at the very
     bottom — it's what makes this content show up.
   ========================================================================== */

const VIDEO_ITEMS = [
  {
    title: "December SL Video",
    date: "2025-12-15",
    description: "Replace this with a short description of what's in the video.",
    videoSrc: "videos/December 2025 SL Video.mp4"
  },
  {
    title: "Example: Weekly Devotional",
    date: "2026-08-08",
    description: "This is what an older video looks like in the archive — it will move further down automatically as newer ones are added.",
    videoSrc: "videos/example-2.mp4"
  }
];

// Make this list available to script.js. (Do not remove this line —
// it's what makes Videos actually show up on the page.)
window.VIDEO_ITEMS = VIDEO_ITEMS;

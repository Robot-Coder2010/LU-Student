/* ==========================================================================
   Latter UP — FAQ Content
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to add, remove, or change FAQ
   questions. Each entry is one { question, answer } pair in the list below.

   To ADD a question:
     Copy an existing { ... } block, paste it before the closing bracket,
     and change the text.

   To REMOVE a question:
     Delete its whole { ... } block (including the comma after it).

   To EDIT a question:
     Just change the text between the quotes.

   Notes:
   - Keep the quotes " " around your text.
   - If your text itself needs a quote mark, put a backslash before it,
     like this: "This is a \"quoted\" word."
   - The answer field supports basic HTML, so you can use <a href="...">
     to add a link, or <br><br> for a paragraph break.
   - Do NOT rename FAQ_ITEMS below — script.js looks for this exact name.
   ========================================================================== */

const FAQ_ITEMS = [
  {
    question: "What is Latter UP?",
    answer: "Latter UP is an online, LDS-based co-op that brings students together for classes, community, and gospel learning in a virtual setting."
  },
  {
    question: "How do I join my class's google meet?",
    answer: "Click the Google Chat button above, or go directly to <a href=\"https://mail.google.com/chat\" target=\"_blank\" rel=\"noopener\">mail.google.com/chat</a>. Make sure you're signed in with your LU account. Open the class you want and press the join meet button. You can only get on the class during class times and when a teacher is also on the meet."
  },
  {
    question: "Where do I find my assignments?",
    answer: "All assignments, materials, and due dates are posted in Google Classroom under each specific class. Use the Google Classroom button above to jump straight there."
  },
  {
    question: "I can't access Google Classroom — what do I do?",
    answer: "First, make sure you're logged in and opening the classroom with your LU account. If you're still having trouble, message us on Google Chat or send an email to tech support <a href=\"mailto:techsupport@latterup.org\">techsupport@latterup.org</a> and we'll get you sorted out."
  },
  {
    question: "How do I contact a teacher?",
    answer: "Teachers can be messaged directly through Google Chat with a parent included in the chat. The eacher's email is their first and last name @latterup.org. <br> <br> For example: if your teacher was Bob Ross, the email would be: BobRoss@latterup.org"
  },
  {
    question: "Who do I contact for technical issues?",
    answer: "For any tech trouble (login issues, video/audio problems, etc.), email <a href=\"mailto:techsupport@latterup.org\">techsupport@latterup.org</a> and include a short description of the issue. They can get you all sorted"
  }
];

// Make this list available to script.js. (Do not remove this line —
// it's what makes the FAQ actually show up on the page.)
window.FAQ_ITEMS = FAQ_ITEMS;

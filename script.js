/* ==========================================================================
   Latter UP — Site Script
   Renders the FAQ list from faq-data.js and the Announcements list from
   announcements-data.js, then sets the footer's copyright year.

   No need to edit this file to change content — edit faq-data.js or
   announcements-data.js instead.
   ========================================================================== */

(function () {

  // ---------- FAQ ----------
  const faqList = document.getElementById("faq-list");

  if (faqList) {
    if (!Array.isArray(window.FAQ_ITEMS)) {
      // faq-data.js didn't load, or FAQ_ITEMS is missing/misnamed.
      // Show a visible message instead of a silent blank section.
      faqList.innerHTML = '<p style="color:#b23; font-weight:600;">FAQ content failed to load. Check that faq-data.js is uploaded and that the &lt;script src="faq-data.js"&gt; tag appears before script.js in index.html.</p>';
      console.error("Latter UP: window.FAQ_ITEMS not found. Is faq-data.js loaded?");
    } else {
      window.FAQ_ITEMS.forEach((item, index) => {
        const details = document.createElement("details");
        details.className = "faq-item";

        const answerId = `faq-answer-${index}`;

        details.innerHTML = `
          <summary class="faq-question" aria-controls="${answerId}">${item.question}</summary>
          <div class="faq-answer" id="${answerId}">
            <p>${item.answer}</p>
          </div>
        `;

        faqList.appendChild(details);
      });
    }
  }

  // ---------- Announcements ----------
  const announcementsList = document.getElementById("announcements-list");

  if (announcementsList) {
    if (!Array.isArray(window.ANNOUNCEMENT_ITEMS)) {
      announcementsList.innerHTML = '<p style="color:#b23; font-weight:600;">Announcements content failed to load. Check that announcements-data.js is uploaded and that the &lt;script src="announcements-data.js"&gt; tag appears before script.js in index.html.</p>';
      console.error("Latter UP: window.ANNOUNCEMENT_ITEMS not found. Is announcements-data.js loaded?");
    } else {
      window.ANNOUNCEMENT_ITEMS.forEach((item, index) => {
        const details = document.createElement("details");
        details.className = "announcement-item";
        if (item.openByDefault) {
          details.open = true;
        }

        const answerId = `announcement-answer-${index}`;

        let bodyHtml = `<p>${item.text}</p>`;

        if (item.pdfSrc) {
          bodyHtml += `
            <div class="pdf-embed">
              <embed src="${item.pdfSrc}" type="application/pdf" class="pdf-frame">
              <p class="pdf-fallback">
                <a href="${item.pdfSrc}" target="_blank" rel="noopener">Open this week's flyer (PDF) →</a>
              </p>
            </div>
          `;
        }

        details.innerHTML = `
          <summary class="announcement-question" aria-controls="${answerId}">
            <span class="announcement-title-row">
              <span class="announcement-title-text">${item.title}</span>
              <span class="announcement-date">${item.date || ""}</span>
            </span>
          </summary>
          <div class="announcement-answer" id="${answerId}">
            ${bodyHtml}
          </div>
        `;

        announcementsList.appendChild(details);
      });
    }
  }

  // ---------- Footer year ----------
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();

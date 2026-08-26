/* ==========================================================================
   Latter UP — Site Script
   Renders the FAQ list from faq-data.js and powers the accordion.
   No need to edit this file to change FAQ content — edit faq-data.js instead.
   ========================================================================== */

(function () {
  const faqList = document.getElementById("faq-list");

  if (faqList && Array.isArray(window.FAQ_ITEMS)) {
    window.FAQ_ITEMS.forEach((item, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "faq-item";

      const questionId = `faq-question-${index}`;
      const answerId = `faq-answer-${index}`;

      wrapper.innerHTML = `
        <button class="faq-question" id="${questionId}" aria-expanded="false" aria-controls="${answerId}">
          ${item.question}
        </button>
        <div class="faq-answer" id="${answerId}" role="region" aria-labelledby="${questionId}">
          <p>${item.answer}</p>
        </div>
      `;

      faqList.appendChild(wrapper);
    });

    faqList.addEventListener("click", (e) => {
      const button = e.target.closest(".faq-question");
      if (!button) return;

      const item = button.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");
      const isOpen = item.classList.contains("open");

      // Close others for a clean single-open accordion (optional behavior)
      faqList.querySelectorAll(".faq-item.open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          openItem.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      item.classList.toggle("open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + "px" : null;
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

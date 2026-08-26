/* ==========================================================================
   Latter UP — Site Script
   The FAQ now uses native <details>/<summary> HTML elements (see index.html),
   so no JavaScript is needed to make it expand and collapse — the browser
   handles that automatically. This file just sets the footer's copyright year.
   ========================================================================== */

(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

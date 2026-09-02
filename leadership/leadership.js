/* ==========================================================================
   Latter UP — Leadership Content Tool
   Parses pasted announcements-data.js / videos-data.js content into a list
   you can click through, add to, or edit — then regenerates the full file
   text (including the file's header comments) for you to copy back.
   ========================================================================== */

(function () {

  // ---------- Shared helpers ----------

  function escapeForJsString(str) {
    // Escape backslashes first, then double quotes, so the output is safe
    // to drop into a JS double-quoted string literal.
    return String(str).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }

  function todayIso() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  function formatDateForList(iso) {
    if (!iso) return "";
    const parts = iso.split("-");
    if (parts.length !== 3) return iso;
    const [y, m, d] = parts.map(Number);
    const dt = new Date(y, m - 1, d);
    if (isNaN(dt.getTime())) return iso;
    return dt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  function sortByDateDesc(items) {
    return [...items].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  }

  // Extract the array literal between "const NAME = [" and "];" using
  // bracket counting, so nested braces inside strings/objects don't break it.
  function extractArrayLiteral(sourceText, constName) {
    const startMarker = `const ${constName} = [`;
    const startIdx = sourceText.indexOf(startMarker);
    if (startIdx === -1) return null;

    const arrayStart = startIdx + startMarker.length - 1; // position of the "["
    let depth = 0;
    let i = arrayStart;
    let inString = false;
    let stringChar = "";
    let escaped = false;

    for (; i < sourceText.length; i++) {
      const ch = sourceText[i];

      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (ch === "\\") {
          escaped = true;
        } else if (ch === stringChar) {
          inString = false;
        }
        continue;
      }

      if (ch === '"' || ch === "'" || ch === "`") {
        inString = true;
        stringChar = ch;
        continue;
      }

      if (ch === "[") depth++;
      if (ch === "]") {
        depth--;
        if (depth === 0) {
          return sourceText.slice(arrayStart, i + 1);
        }
      }
    }
    return null;
  }

  // Safely evaluate the array literal text into real JS objects.
  // This only runs on text the leadership member pasted in themselves
  // (their own copy of the data file), not arbitrary internet content.
  function parseArrayLiteral(arrayText) {
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(`return (${arrayText});`);
      const result = fn();
      if (!Array.isArray(result)) return null;
      return result;
    } catch (e) {
      console.error("Failed to parse array:", e);
      return null;
    }
  }

  // ---------- Code generation ----------

  function jsStringLiteral(value) {
    return `"${escapeForJsString(value)}"`;
  }

  function buildAnnouncementsFile(items) {
    const sorted = sortByDateDesc(items);
    const entries = sorted.map((item) => {
      const lines = [
        `    title: ${jsStringLiteral(item.title || "")},`,
        `    date: ${jsStringLiteral(item.date || "")},`,
        `    text: ${jsStringLiteral(item.text || "")}` + (item.pdfSrc ? "," : "")
      ];
      if (item.pdfSrc) {
        lines.push(`    pdfSrc: ${jsStringLiteral(item.pdfSrc)}`);
      }
      return "  {\n" + lines.join("\n") + "\n  }";
    });

    return ANNOUNCEMENTS_HEADER + "\nconst ANNOUNCEMENT_ITEMS = [\n" +
      entries.join(",\n") +
      "\n];\n\n" +
      "// Make this list available to script.js. (Do not remove this line —\n" +
      "// it's what makes Announcements actually show up on the page.)\n" +
      "window.ANNOUNCEMENT_ITEMS = ANNOUNCEMENT_ITEMS;\n";
  }

  function buildVideosFile(items) {
    const sorted = sortByDateDesc(items);
    const entries = sorted.map((item) => {
      const lines = [`    title: ${jsStringLiteral(item.title || "")},`];
      lines.push(`    date: ${jsStringLiteral(item.date || "")},`);
      if (item.description) {
        lines.push(`    description: ${jsStringLiteral(item.description)},`);
      }
      if (item.youtubeId) {
        lines.push(`    youtubeId: ${jsStringLiteral(item.youtubeId)}`);
      } else {
        lines.push(`    videoSrc: ${jsStringLiteral(item.videoSrc || "")}`);
      }
      // Remove trailing comma on the last line
      const lastIdx = lines.length - 1;
      lines[lastIdx] = lines[lastIdx].replace(/,$/, "");
      return "  {\n" + lines.join("\n") + "\n  }";
    });

    return VIDEOS_HEADER + "\nconst VIDEO_ITEMS = [\n" +
      entries.join(",\n") +
      "\n];\n\n" +
      "// Make this list available to script.js. (Do not remove this line —\n" +
      "// it's what makes Videos actually show up on the page.)\n" +
      "window.VIDEO_ITEMS = VIDEO_ITEMS;\n";
  }

  const ANNOUNCEMENTS_HEADER = `/* ==========================================================================
   Latter UP — Announcements Content
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to add, remove, or change
   announcements — including PDF flyers.

   Used by BOTH index.html (shows the 2 most recent) and announcements.html
   (shows the full feed) — so you only ever update this one file.

   IMPORTANT ABOUT DATES:
     Always use the format YYYY-MM-DD, for example "2026-08-26" for
     August 26, 2026. This keeps announcements sorted correctly.

   Notes:
   - Keep the quotes " " around your text.
   - The text field supports basic HTML, so you can use <a href="...">
     to add a link, or <br><br> for a paragraph break.
   - Do NOT delete the "window.ANNOUNCEMENT_ITEMS = ANNOUNCEMENT_ITEMS;"
     line at the very bottom — it's what makes this content show up.
   ========================================================================== */
`;

  const VIDEOS_HEADER = `/* ==========================================================================
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
`;

  // ---------- YouTube ID extraction ----------

  function extractYoutubeId(input) {
    const trimmed = input.trim();
    // Already looks like a bare ID (11 chars, typical YouTube ID alphabet)
    if (/^[A-Za-z0-9_-]{6,20}$/.test(trimmed) && !trimmed.includes("/") && !trimmed.includes(".")) {
      return trimmed;
    }
    const patterns = [
      /[?&]v=([A-Za-z0-9_-]+)/,
      /youtu\.be\/([A-Za-z0-9_-]+)/,
      /embed\/([A-Za-z0-9_-]+)/
    ];
    for (const re of patterns) {
      const m = trimmed.match(re);
      if (m) return m[1];
    }
    return trimmed; // fall back to whatever they typed
  }

  // ============================================================
  // Generic controller factory — one for announcements, one for videos
  // ============================================================

  function setupSection(config) {
    let items = [];
    let editingIndex = null; // null = adding new; number = editing that index in `items`

    const sourceEl = document.getElementById(config.sourceId);
    const loadBtn = document.getElementById(config.loadBtnId);
    const loadStatus = document.getElementById(config.loadStatusId);

    const listStep = document.getElementById(config.listStepId);
    const listEl = document.getElementById(config.listId);
    const addNewBtn = document.getElementById(config.addNewBtnId);

    const formStep = document.getElementById(config.formStepId);
    const formTitle = document.getElementById(config.formTitleId);
    const saveBtn = document.getElementById(config.saveBtnId);
    const deleteBtn = document.getElementById(config.deleteBtnId);
    const cancelBtn = document.getElementById(config.cancelBtnId);

    const outputStep = document.getElementById(config.outputStepId);
    const outputEl = document.getElementById(config.outputId);
    const copyBtn = document.getElementById(config.copyBtnId);
    const copyStatus = document.getElementById(config.copyStatusId);

    function renderList() {
      listEl.innerHTML = "";
      if (items.length === 0) {
        listEl.innerHTML = '<p class="lt-list-empty">No entries loaded yet.</p>';
        return;
      }
      const sorted = sortByDateDesc(items);
      sorted.forEach((item) => {
        const realIndex = items.indexOf(item);
        const row = document.createElement("div");
        row.className = "lt-list-item";
        row.innerHTML = `
          <span class="lt-list-item-title">${config.getTitle(item)}</span>
          <span class="lt-list-item-date">${formatDateForList(item.date)}</span>
        `;
        row.addEventListener("click", () => openForm(realIndex));
        listEl.appendChild(row);
      });
    }

    function openForm(index) {
      editingIndex = index;
      const isEditing = index !== null;
      formTitle.textContent = isEditing ? `Edit: ${config.getTitle(items[index])}` : config.newLabel;
      deleteBtn.hidden = !isEditing;
      config.fillForm(isEditing ? items[index] : null);
      formStep.hidden = false;
      outputStep.hidden = true;
      formStep.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function closeForm() {
      formStep.hidden = true;
      editingIndex = null;
    }

    function regenerateOutput() {
      outputEl.value = config.buildFile(items);
      outputStep.hidden = false;
      copyStatus.textContent = "";
    }

    loadBtn.addEventListener("click", () => {
      const text = sourceEl.value;
      if (!text.trim()) {
        loadStatus.textContent = "Paste the file's contents first.";
        loadStatus.style.color = "#d9534f";
        return;
      }
      const arrayText = extractArrayLiteral(text, config.constName);
      if (!arrayText) {
        loadStatus.textContent = `Couldn't find "const ${config.constName} = [...]" in that text. Make sure you copied the whole file.`;
        loadStatus.style.color = "#d9534f";
        return;
      }
      const parsed = parseArrayLiteral(arrayText);
      if (!parsed) {
        loadStatus.textContent = "Couldn't read that — check you copied the whole file correctly and try again.";
        loadStatus.style.color = "#d9534f";
        return;
      }
      items = parsed;
      loadStatus.textContent = `Loaded ${items.length} ${items.length === 1 ? "entry" : "entries"}.`;
      loadStatus.style.color = "#1e8e3e";
      listStep.hidden = false;
      renderList();
      regenerateOutput();
    });

    addNewBtn.addEventListener("click", () => openForm(null));
    cancelBtn.addEventListener("click", closeForm);

    saveBtn.addEventListener("click", () => {
      const entry = config.readForm();
      if (!entry) return; // validation failed, config.readForm shows its own message

      if (editingIndex !== null) {
        items[editingIndex] = entry;
      } else {
        items.push(entry);
      }
      closeForm();
      renderList();
      regenerateOutput();
      outputStep.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    deleteBtn.addEventListener("click", () => {
      if (editingIndex === null) return;
      if (!confirm("Delete this entry? This only affects the code below — nothing is deleted from GitHub until you paste and commit.")) {
        return;
      }
      items.splice(editingIndex, 1);
      closeForm();
      renderList();
      regenerateOutput();
    });

    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(outputEl.value);
        copyStatus.textContent = "Copied!";
      } catch (e) {
        outputEl.select();
        document.execCommand("copy");
        copyStatus.textContent = "Copied!";
      }
      setTimeout(() => { copyStatus.textContent = ""; }, 2500);
    });
  }

  // ---------- Announcements-specific form wiring ----------

  setupSection({
    sourceId: "ann-source",
    loadBtnId: "ann-load-btn",
    loadStatusId: "ann-load-status",
    listStepId: "ann-list-step",
    listId: "ann-list",
    addNewBtnId: "ann-add-new-btn",
    formStepId: "ann-form-step",
    formTitleId: "ann-form-title",
    saveBtnId: "ann-save-entry-btn",
    deleteBtnId: "ann-delete-entry-btn",
    cancelBtnId: "ann-cancel-btn",
    outputStepId: "ann-output-step",
    outputId: "ann-output",
    copyBtnId: "ann-copy-btn",
    copyStatusId: "ann-copy-status",
    constName: "ANNOUNCEMENT_ITEMS",
    newLabel: "New announcement",
    getTitle: (item) => item.title || "(untitled)",
    buildFile: buildAnnouncementsFile,
    fillForm: (item) => {
      document.getElementById("ann-title").value = item ? item.title || "" : "";
      document.getElementById("ann-date").value = item ? item.date || "" : todayIso();
      document.getElementById("ann-text").value = item ? item.text || "" : "";
      document.getElementById("ann-pdf").value = item ? item.pdfSrc || "" : "";
    },
    readForm: () => {
      const title = document.getElementById("ann-title").value.trim();
      const date = document.getElementById("ann-date").value.trim();
      const text = document.getElementById("ann-text").value.trim();
      const pdfSrc = document.getElementById("ann-pdf").value.trim();

      if (!title || !date || !text) {
        alert("Please fill in at least the title, date, and details.");
        return null;
      }
      const entry = { title, date, text };
      if (pdfSrc) entry.pdfSrc = pdfSrc;
      return entry;
    }
  });

  // ---------- Videos-specific form wiring ----------

  const vidTypeRadios = document.querySelectorAll('input[name="vid-type"]');
  const vidFileFields = document.getElementById("vid-file-fields");
  const vidYoutubeFields = document.getElementById("vid-youtube-fields");

  vidTypeRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const isYoutube = document.querySelector('input[name="vid-type"]:checked').value === "youtube";
      vidFileFields.hidden = isYoutube;
      vidYoutubeFields.hidden = !isYoutube;
    });
  });

  setupSection({
    sourceId: "vid-source",
    loadBtnId: "vid-load-btn",
    loadStatusId: "vid-load-status",
    listStepId: "vid-list-step",
    listId: "vid-list",
    addNewBtnId: "vid-add-new-btn",
    formStepId: "vid-form-step",
    formTitleId: "vid-form-title",
    saveBtnId: "vid-save-entry-btn",
    deleteBtnId: "vid-delete-entry-btn",
    cancelBtnId: "vid-cancel-btn",
    outputStepId: "vid-output-step",
    outputId: "vid-output",
    copyBtnId: "vid-copy-btn",
    copyStatusId: "vid-copy-status",
    constName: "VIDEO_ITEMS",
    newLabel: "New video",
    getTitle: (item) => item.title || "(untitled)",
    buildFile: buildVideosFile,
    fillForm: (item) => {
      document.getElementById("vid-title").value = item ? item.title || "" : "";
      document.getElementById("vid-date").value = item ? item.date || "" : todayIso();
      document.getElementById("vid-desc").value = item ? item.description || "" : "";

      const isYoutube = item && item.youtubeId;
      document.querySelector(`input[name="vid-type"][value="${isYoutube ? "youtube" : "file"}"]`).checked = true;
      vidFileFields.hidden = !!isYoutube;
      vidYoutubeFields.hidden = !isYoutube;

      document.getElementById("vid-src").value = item ? item.videoSrc || "" : "";
      document.getElementById("vid-yt").value = item ? item.youtubeId || "" : "";
    },
    readForm: () => {
      const title = document.getElementById("vid-title").value.trim();
      const date = document.getElementById("vid-date").value.trim();
      const description = document.getElementById("vid-desc").value.trim();
      const type = document.querySelector('input[name="vid-type"]:checked').value;

      if (!title || !date) {
        alert("Please fill in at least the title and date.");
        return null;
      }

      const entry = { title, date };
      if (description) entry.description = description;

      if (type === "youtube") {
        const raw = document.getElementById("vid-yt").value.trim();
        if (!raw) {
          alert("Please enter a YouTube video ID or link.");
          return null;
        }
        entry.youtubeId = extractYoutubeId(raw);
      } else {
        const src = document.getElementById("vid-src").value.trim();
        if (!src) {
          alert("Please enter the video filename.");
          return null;
        }
        entry.videoSrc = src;
      }
      return entry;
    }
  });

  // ---------- Tabs ----------

  const tabs = document.querySelectorAll(".lt-tab");
  const panels = {
    announcements: document.getElementById("panel-announcements"),
    videos: document.getElementById("panel-videos")
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      Object.entries(panels).forEach(([key, panel]) => {
        const isActive = key === tab.dataset.tab;
        panel.hidden = !isActive;
        panel.classList.toggle("is-active", isActive);
      });
    });
  });

})();

function addCopyToS3Deletes() {
  document.querySelectorAll("em").forEach((em) => {
    if (em.classList.contains("copy-em-text")) return;

    const text = em.textContent.trim().toLowerCase();
    if (text !== "permanently delete" && text !== "delete") return;

    em.classList.add("copy-em-text");
    em.title = "Click to copy to clipboard";

    em.addEventListener("click", () => {
      navigator.clipboard.writeText(em.textContent.trim()).then(() => {
        const original = em.textContent;
        em.textContent = "Copied!";
        setTimeout(() => (em.textContent = original), 1000);
      });
    });
  });
}

function addCopyToRoleDeletes() {
  const tables = document.querySelectorAll('[role="table"]');
  if (tables.length < 3) return;

  const div = tables[2].querySelector("tbody tr td div");
  if (!div || div.classList.contains("copy-em-text")) return;

  div.classList.add("copy-em-text");
  div.title = "Click to copy to clipboard";

  div.addEventListener("click", () => {
    navigator.clipboard.writeText(div.textContent.trim()).then(() => {
      const original = div.textContent;
      div.textContent = "Copied!";
      setTimeout(() => (div.textContent = original), 1000);
    });
  });
}

function addCopyToS3DeleteBucket() {
  const span = document.querySelectorAll("h1 span")[0];
  if (!span || span.dataset.bucketCopyDone) return;
  if (!span.textContent.toLowerCase().includes("delete bucket")) return;

  span.dataset.bucketCopyDone = "true";
  span.classList.add("copy-em-text");
  span.title = "Click to copy placeholder to clipboard";

  span.addEventListener("click", () => {
    const input = document.querySelector('input[type="text"][autocomplete="off"]');
    if (!input || !input.placeholder) return;

    navigator.clipboard.writeText(input.placeholder).then(() => {
      const original = span.textContent;
      span.textContent = "Copied!";
      setTimeout(() => (span.textContent = original), 1000);
    });
  });
}

function runAll() {
  addCopyToS3Deletes();
  addCopyToRoleDeletes();
  addCopyToS3DeleteBucket();
}

// Run once on load, then watch for dynamically added content (AWS console is an SPA).
runAll();
new MutationObserver(runAll).observe(document.body, {
  childList: true,
  subtree: true,
});

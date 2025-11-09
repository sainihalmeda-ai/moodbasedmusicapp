document.addEventListener("DOMContentLoaded", () => {
  const firstPrefForm = document.getElementById("firstPref");
  const secondPrefForm = document.getElementById("secondPref");
  const result = document.getElementById("result");
  const button = document.getElementById("submitBtn");

  button.addEventListener("click", () => {
    // Get first language (radio)
    const firstLang = firstPrefForm.querySelector("input[name='firstLang']:checked");
    const first = firstLang ? firstLang.value : null;

    // Get second languages (checkboxes)
    const checkedBoxes = secondPrefForm.querySelectorAll("input[name='secondLang']:checked");
    const second = Array.from(checkedBoxes).map((el) => el.value);

    if (!first) {
      result.style.color = "#ff7b7b";
      result.textContent = "⚠️ Please select your first language preference!";
      return;
    }

    // Save to localStorage
    localStorage.setItem("firstLanguage", first);
    localStorage.setItem("secondLanguages", JSON.stringify(second));

    // Display confirmation
    result.style.color = "#5ef3a1";
    result.innerHTML = `
      ✅ Your first language: <strong>${first}</strong><br>
      🎶 Second preferences: <strong>${second.length ? second.join(", ") : "None"}</strong>
    `;
  });
});

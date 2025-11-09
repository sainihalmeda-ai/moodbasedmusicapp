function selectOption(element, gender) {
  document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
  element.classList.add("selected");
  document.getElementById("status").innerHTML = `✅ Gender updated to: <strong>${gender}</strong>`;
}

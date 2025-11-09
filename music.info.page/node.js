window.addEventListener("DOMContentLoaded", () => {
  // --- Generate roaming instrument sprites ---
  const SPRITES = [
    '🎸','🎷','🎺','🎹','🥁','🎻','🎼','🎧','🎤','🎵','🎶','🪗','🪘'
  ];
  const MAX = 70;
  const container = document.getElementById("sprites");

  function rand(min, max) { return Math.random() * (max - min) + min; }

  for (let i = 0; i < MAX; i++) {
    const el = document.createElement("div");
    el.className = "sprite";
    el.textContent = SPRITES[Math.floor(Math.random() * SPRITES.length)];
    el.style.left = rand(-5, 100) + "vw";
    el.style.top = rand(-5, 100) + "vh";
    el.style.fontSize = rand(14, 30) + "px";
    el.style.opacity = rand(0.28, 0.7).toFixed(2);

    const yDur = rand(5, 12).toFixed(2) + "s";
    const xDur = rand(8, 18).toFixed(2) + "s";
    const wig = rand(3, 8).toFixed(2) + "s";
    const delay = rand(-10, 0).toFixed(2) + "s";
    el.style.animationDuration = `${yDur}, ${xDur}, ${wig}`;
    el.style.animationDelay = `${delay}, ${delay}, ${delay}`;

    container.appendChild(el);
  }

  // --- Form logic ---
  const form = document.getElementById("nameForm");
  const input = document.getElementById("name");
  const greet = document.getElementById("greet");

  // Pre-fill from localStorage
  const saved = localStorage.getItem("musicapp_name");
  if (saved) {
    input.value = saved;
    greet.textContent = `Hi ${saved}! Nice to see you again.`;
  }

  // Focus input automatically
  input.focus();

  // Handle form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if (!name) return;

    localStorage.setItem("musicapp_name", name);
    greet.textContent = `Great, ${name}! Let’s tune your experience.`;

    const btn = form.querySelector("button");
    btn.animate(
      [
        { transform: "translateY(0)" },
        { transform: "translateY(2px) scale(0.99)" },
        { transform: "translateY(0)" }
      ],
      { duration: 160, easing: "ease-out" }
    );
  });

  // Escape clears the input
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      input.value = "";
      greet.textContent = "";
    }
  });
});

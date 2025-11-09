const NOTE_SYMBOLS = ['♪', '♫', '♩', '♬', '𝄞', '𝅘𝅥𝅮', '𝄢', '♪', '♫', '♩', '♬', '𝄞'];
const FALLING_COUNT = 24;
const FALL_DURATION = 1200;

const fallingNotesEl = document.getElementById('falling-notes');
const loadingScene = document.getElementById('loading-scene');
const getAccessBtn = document.getElementById('get-access-btn');

function createFallingNotes() {
  for (let i = 0; i < FALLING_COUNT; i++) {
    const note = document.createElement('div');
    note.className = 'falling-note';
    note.textContent = NOTE_SYMBOLS[Math.floor(Math.random() * NOTE_SYMBOLS.length)];
    note.style.fontSize = `${16 + Math.random() * 12}px`;
    note.style.left = `${Math.random() * 100}vw`;

    if (i % 2 === 0) {
      note.style.top = '-50px';
      note.style.transform = `translateY(${window.innerHeight + 100}px)`;
    } else {
      note.style.bottom = '-50px';
      note.style.top = 'auto';
      note.style.transform = `translateY(${-window.innerHeight - 100}px)`;
    }

    note.style.opacity = '0';
    fallingNotesEl.appendChild(note);

    setTimeout(() => {
      note.style.transition = `transform ${FALL_DURATION}ms cubic-bezier(0.2, 0.8, 0.4, 1), opacity ${FALL_DURATION}ms ease-out`;
      note.style.transform = 'translateY(0)';
      note.style.opacity = '0.9';
    }, i * 40);
  }
}

function createOrbitingNotes() {
  const total = 8;
  for (let i = 0; i < total; i++) {
    const note = document.createElement('div');
    note.className = 'orbiting-note';
    note.textContent = NOTE_SYMBOLS[i % NOTE_SYMBOLS.length];
    note.style.fontSize = `${24 + Math.random() * 4}px`;
    note.style.top = '50%';
    note.style.left = '50%';
    note.style.transformOrigin = '0 0';
    note.style.animationDelay = `-${i * (16 / total)}s`;
    loadingScene.appendChild(note);

    setTimeout(() => {
      note.classList.add('animate');
    }, 200 + i * 80);
  }
}

// ✅ Redirect to next page
getAccessBtn.addEventListener('click', () => {
  window.location.href = "index2.html"; // <-- Change filename if needed
});

window.addEventListener('DOMContentLoaded', () => {
  createFallingNotes();

  setTimeout(() => {
    loadingScene.style.opacity = '1';
    createOrbitingNotes();
  }, FALL_DURATION + 300);

  setTimeout(() => {
    loadingScene.style.opacity = '0';
    setTimeout(() => {
      loadingScene.style.display = 'none';
      getAccessBtn.style.display = 'block';
    }, 800);
  }, 3000);
});

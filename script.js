const backgroundSong = document.querySelector('#backgroundSong');
const cheerButton = document.querySelector('#cheerButton');
const tinyNote = document.querySelector('#tinyNote');
const confetti = document.querySelector('#confetti');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

backgroundSong.volume = 0.55;

async function startBackgroundSong() {
  try {
    await backgroundSong.play();
    ['pointerdown', 'touchstart', 'keydown'].forEach((eventName) => {
      document.removeEventListener(eventName, startBackgroundSong);
    });
  } catch {
    ['pointerdown', 'touchstart', 'keydown'].forEach((eventName) => {
      document.addEventListener(eventName, startBackgroundSong, { once: true });
    });
  }
}

startBackgroundSong();

function makeConfetti() {
  const colors = ['#f2a6a6', '#f5c85b', '#bed8c4', '#ee7d67', '#fff8ef'];
  for (let i = 0; i < 48; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty('--drift', `${Math.random() * 240 - 120}px`);
    piece.style.animationDelay = `${Math.random() * .45}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    confetti.appendChild(piece);
    window.setTimeout(() => piece.remove(), 3400);
  }
}

if (cheerButton && tinyNote) {
  cheerButton.addEventListener('click', () => {
    makeConfetti();
    tinyNote.textContent = 'Cheer sent — may it find someone who needs it today!';
    cheerButton.innerHTML = 'Cheer sent! <span aria-hidden="true">♥</span>';
    window.setTimeout(() => {
      cheerButton.innerHTML = 'Send some cheer <span aria-hidden="true">♡</span>';
    }, 2800);
  });
}

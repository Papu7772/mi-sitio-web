// JavaScript educativo: interacción mínima y comentada para estudiantes

document.addEventListener('DOMContentLoaded', function () {
  const themeBtn = document.getElementById('themeBtn');
  const body = document.body;
  const navToggle = document.getElementById('navToggle');
  const navList = document.querySelector('.nav-list');

  // Tema: persistir elección en localStorage
  const currentTheme = localStorage.getItem('animelab-theme');
  if (currentTheme === 'light') body.classList.add('light');

  themeBtn.addEventListener('click', function () {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    localStorage.setItem('animelab-theme', isLight ? 'light' : 'dark');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
  });

  // Navegación móvil
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navList.classList.toggle('show');
    navToggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('show');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', false);
    });
  });
});

// ---------------- Lightbox ----------------
window.openLightbox = function (src) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = src;
  lightbox.style.display = 'flex';
};

window.closeLightbox = function (e) {
  if (e.target.id === 'lightbox' || e.target.id === 'lightboxImg') {
    document.getElementById('lightbox').style.display = 'none';
    document.getElementById('lightboxImg').src = '';
  }
};


window.showProfile = function (name) {
  const bio = {
    'Hinata': 'Hinata — ninja del Clan Hyuga. Habilidad: Byakugan y Jūken preciso.',
    'Ryuu Lion': 'Ryuu — ex-aventurera elfa. Habilidad: velocidad sigilosa y magia Étoile.',
    'Kotone': 'Kotone — estudiante tranquila. Habilidad: empatía y apoyo emocional.',
    'Hatsune Miku': 'Miku — cantante virtual. Habilidad: voz sintetizada de amplio rango.',
    'SPY x FAMILY': 'La Temporada 3 continúa con misiones secretas y nuevas amenazas.',
    'My hero academia': 'Temporada final con guerra total entre héroes y villanos.',
    'Ranma ½': 'Remake con animación moderna y escenas nuevas.'
  };

  const modal = document.getElementById("profileModal");
  const text = document.getElementById("modalText");

  text.textContent = bio[name] || "Información no disponible.";

  modal.classList.add("show");

  // Botón Aceptar
  document.getElementById("closeProfileModal").onclick = () => {
    modal.classList.remove("show");
  };

  // Click fuera para cerrar
  modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove("show");
  };

  // Animación en tarjeta
  const cards = document.querySelectorAll('.card h4');
  cards.forEach(card => {
    if (card.textContent === name) {
      const parent = card.parentElement;
      parent.classList.add('animate');
      setTimeout(() => parent.classList.remove('animate'), 500);
    }
  });
};


(function () {
  const form = document.getElementById('contactForm');
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const messageEl = document.getElementById('message');

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorMessage = document.getElementById('error-message');
  const feedback = document.getElementById('formFeedback');
  const btnReset = document.getElementById('btnReset');

  function validateName() {
    const v = nameEl.value.trim();
    if (!v) return 'El nombre es obligatorio.';
    if (v.length < 2) return 'Escribe al menos 2 caracteres.';
    return '';
  }

  function validateEmail() {
    const v = emailEl.value.trim();
    if (!v) return 'El correo es obligatorio.';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!re.test(v)) return 'Introduce un correo válido.';
    return '';
  }

  function validateMessage() {
    const v = messageEl.value.trim();
    if (!v) return 'El mensaje no puede estar vacío.';
    if (v.length < 10) return 'Escribe mínimo 10 caracteres.';
    return '';
  }

  function showFieldError(el, errorEl, msg) {
    if (msg) {
      el.classList.add('input-error');
      el.classList.remove('input-success');
      errorEl.textContent = msg;
    } else {
      el.classList.remove('input-error');
      el.classList.add('input-success');
      errorEl.textContent = '';
    }
  }

  function clearFeedback() {
    feedback.className = 'form-feedback';
    feedback.textContent = '';
  }

  nameEl.addEventListener('input', () => {
    showFieldError(nameEl, errorName, validateName());
    clearFeedback();
  });

  emailEl.addEventListener('input', () => {
    showFieldError(emailEl, errorEmail, validateEmail());
    clearFeedback();
  });

  messageEl.addEventListener('input', () => {
    showFieldError(messageEl, errorMessage, validateMessage());
    clearFeedback();
  });

  btnReset.addEventListener('click', () => {
    [nameEl, emailEl, messageEl].forEach(i => {
      i.classList.remove('input-error', 'input-success');
    });
    [errorName, errorEmail, errorMessage].forEach(e => e.textContent = '');
    clearFeedback();
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    const vName = validateName();
    const vEmail = validateEmail();
    const vMessage = validateMessage();

    showFieldError(nameEl, errorName, vName);
    showFieldError(emailEl, errorEmail, vEmail);
    showFieldError(messageEl, errorMessage, vMessage);

    if (vName || vEmail || vMessage) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Hay errores. Corrige antes de enviar.';
      return;
    }

    feedback.className = 'form-feedback success';
    feedback.textContent = '¡Mensaje enviado correctamente! (simulado)';

    setTimeout(() => {
      form.reset();
      [nameEl, emailEl, messageEl].forEach(i => {
        i.classList.remove('input-success');
      });
      setTimeout(() => clearFeedback(), 3000);
    }, 1200);
  });
})();

// -------- Reproductor de Música --------
(function () {
  const audio = document.getElementById('bgMusic');
  const btnToggle = document.getElementById('btnToggleMusic');
  const btnMute = document.getElementById('btnMute');

  btnToggle.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      btnToggle.textContent = "⏸ Pausar";
    } else {
      audio.pause();
      btnToggle.textContent = "▶ Reproducir";
    }
  });

  btnMute.addEventListener('click', () => {
    audio.muted = !audio.muted;
    btnMute.textContent = audio.muted ? "🔊 Escuchar" : "🔇 Silenciar";
  });
})();


(function () {
  const aboutSection = document.getElementById("about");
  const openBtn = document.getElementById("openAbout");
  const closeBtn = document.getElementById("closeAbout");

  openBtn.addEventListener("click", () => {
    aboutSection.classList.remove("hidden");
    setTimeout(() => aboutSection.classList.add("show"), 10);
  });

  closeBtn.addEventListener("click", () => {
    aboutSection.classList.remove("show");
    setTimeout(() => aboutSection.classList.add("hidden"), 300);
  });

  aboutSection.addEventListener("click", (e) => {
    if (e.target === aboutSection) closeBtn.click();
  });
})();

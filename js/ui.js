// ─────────────────────────────────────────
// ui.js — Thème, toast, navbar, animations
// ─────────────────────────────────────────

var modeNuit = true;
var timerToast;

function changerTheme() {
  modeNuit = !modeNuit;
  var r = document.documentElement.style;
  if (modeNuit) {
    r.setProperty('--fond',   '#080b12');
    r.setProperty('--fond2',  '#0c1020');
    r.setProperty('--fond3',  '#111628');
    r.setProperty('--carte',  '#0e1322');
    r.setProperty('--texte',  '#eee8d8');
    r.setProperty('--gris',   '#5a6080');
    r.setProperty('--gris2',  '#8892b0');
    r.setProperty('--bordure','#1a2040');
    document.querySelector('.btn-theme').textContent = '🌙';
  } else {
    r.setProperty('--fond',   '#f7f4ef');
    r.setProperty('--fond2',  '#ede9e2');
    r.setProperty('--fond3',  '#e4dfd7');
    r.setProperty('--carte',  '#ede9e2');
    r.setProperty('--texte',  '#1a1a2a');
    r.setProperty('--gris',   '#8890a8');
    r.setProperty('--gris2',  '#5a6080');
    r.setProperty('--bordure','#d0c9be');
    document.querySelector('.btn-theme').textContent = '☀️';
  }
}

function afficherToast(message, type) {
  var el = document.getElementById('toast');
  el.textContent = message;
  el.className = 'visible ' + (type || 'info');
  clearTimeout(timerToast);
  timerToast = setTimeout(function() { el.className = ''; }, 3000);
}

window.addEventListener('scroll', function() {
  document.getElementById('navbar').classList.toggle('defilé', window.scrollY > 30);
});

function ouvrirMenu() {
  document.getElementById('menu-mob').classList.toggle('ouvert');
}
function fermerMenu() {
  document.getElementById('menu-mob').classList.remove('ouvert');
}

function lancerAnimations() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.app').forEach(function(el) {
    if (!el.classList.contains('visible')) obs.observe(el);
  });
}

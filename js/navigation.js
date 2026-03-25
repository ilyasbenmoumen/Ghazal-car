// ─────────────────────────────────────────
// navigation.js — Changement de pages
// ─────────────────────────────────────────

var idVoitureActuelle = null;

function allerVers(page, id) {
  if (page === 'admin' && !adminConnecte) { allerVers('login'); return; }

  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });

  var el = document.getElementById('page-' + page);
  if (!el) { document.getElementById('page-404').classList.add('active'); return; }

  el.classList.add('active');
  window.scrollTo(0, 0);

  document.querySelectorAll('.nl, .nl-mob').forEach(function(l) {
    l.classList.toggle('actif', l.dataset.page === page);
  });

  if (page === 'accueil')     afficherAccueil();
  if (page === 'flotte')      afficherFlotte();
  if (page === 'reservation') remplirSelect();
  if (page === 'detail' && id) { idVoitureActuelle = id; afficherDetail(id); }
  if (page === 'admin')       { afficherListeAdmin(); afficherReservations(); }

  setTimeout(lancerAnimations, 80);
}

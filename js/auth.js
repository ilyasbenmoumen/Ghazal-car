// ─────────────────────────────────────────
// auth.js — Connexion admin
// ─────────────────────────────────────────

var adminConnecte = false;

function seConnecter() {
  var email = document.getElementById('login-email').value.trim();
  var mdp   = document.getElementById('login-mdp').value;
  if (!email || !mdp) { afficherToast('Veuillez remplir tous les champs.', 'erreur'); return; }
  if (email === 'admin@ghazalcar.com' && mdp === 'admin123') {
    adminConnecte = true;
    majInterface();
    afficherToast('Connexion réussie !', 'succes');
    allerVers('admin');
  } else {
    afficherToast('Email ou mot de passe incorrect.', 'erreur');
  }
}

function seDeconnecter() {
  adminConnecte = false;
  majInterface();
  allerVers('accueil');
  afficherToast('Vous êtes déconnecté.', 'info');
}

function majInterface() {
  document.querySelectorAll('.lien-admin').forEach(function(el) { el.style.display = adminConnecte ? '' : 'none'; });
  document.getElementById('btn-deco').style.display       = adminConnecte ? '' : 'none';
  document.getElementById('btn-deco-mob').style.display   = adminConnecte ? '' : 'none';
}

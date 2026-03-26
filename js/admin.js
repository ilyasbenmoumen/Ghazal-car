// ─────────────────────────────────────────
// admin.js — Gestion admin
// ─────────────────────────────────────────

var STATUTS = { attente:'En attente', confirme:'Confirmée', termine:'Terminée', annule:'Annulée' };

function changerOnglet(o) {
  document.querySelectorAll('.btn-ong').forEach(function(b, i) { b.classList.toggle('actif', (i===0&&o==='voitures')||(i===1&&o==='reservations')); });
  document.getElementById('tab-voitures').classList.toggle('actif', o==='voitures');
  document.getElementById('tab-reservations').classList.toggle('actif', o==='reservations');
}

function afficherListeAdmin() {
  var c = document.getElementById('liste-admin');
  if (!voitures.length) { c.innerHTML = '<div class="vide"><div class="em">🚗</div><p>Aucun véhicule.</p></div>'; return; }
  c.innerHTML = voitures.map(function(v) {
    return '<div class="rangee-admin">' +
      '<div><div class="admin-nom">' + v.nom + '</div>' +
      '<div class="admin-sous">' + v.categorie + ' · ' + v.prix + ' MAD/jour · ' +
        '<span class="' + (v.disponible ? 'vert-p' : 'rouge-p') + '">' + (v.disponible ? 'Disponible' : 'Indisponible') + '</span>' +
      '</div></div>' +
      '<div class="admin-actions">' +
        '<button class="btn-tog" onclick="changerDispo(\'' + v.id + '\')">' + (v.disponible ? '●' : '○') + '</button>' +
        '<button class="btn-sup" onclick="supprimerVoiture(\'' + v.id + '\')">🗑️</button>' +
      '</div></div>';
  }).join('');
}

function ajouterVoiture() {
  var nom  = document.getElementById('add-nom').value.trim();
  var cat  = document.getElementById('add-cat').value.trim();
  var prix = Number(document.getElementById('add-prix').value);
  var pl   = Number(document.getElementById('add-places').value);
  var img  = document.getElementById('add-img').value.trim();
  var tr   = document.getElementById('add-trans').value.trim();
  if (!nom || !cat || !prix || !pl) { afficherToast('Remplissez les champs obligatoires (*).', 'erreur'); return; }
  voitures.push({ id: Date.now().toString(), nom: nom, categorie: cat, prix: prix, places: pl, image: img || 'images/car-sedan.jpg', transmission: tr || 'Manuelle', carburant: 'Essence', disponible: true });
  afficherToast('Véhicule ajouté !', 'succes');
  ['add-nom','add-cat','add-prix','add-places','add-img'].forEach(function(x) { document.getElementById(x).value = ''; });
  document.getElementById('add-trans').value = 'Manuelle';
  afficherListeAdmin();
}

function changerDispo(id) {
  var v = voitures.find(function(x) { return x.id === id; });
  if (v) { v.disponible = !v.disponible; afficherListeAdmin(); afficherToast('Disponibilité mise à jour.', 'info'); }
}

function supprimerVoiture(id) {
  voitures = voitures.filter(function(x) { return x.id !== id; });
  afficherListeAdmin();
  afficherToast('Véhicule supprimé.', 'info');
}

function afficherReservations() {
  var c = document.getElementById('liste-res');
  if (!reservations.length) { c.innerHTML = '<div class="vide"><div class="em">📅</div><p>Aucune réservation.</p></div>'; return; }
  c.innerHTML = reservations.map(function(r) {
    var btns = r.statut === 'attente'
      ? '<div class="res-btns"><button class="btn btn-vert btn-sm" onclick="changerStatut(\'' + r.id + '\',\'confirme\')">Confirmer</button><button class="btn btn-rouge btn-sm" onclick="changerStatut(\'' + r.id + '\',\'annule\')">Annuler</button></div>'
      : '';
    return '<div class="carte-res">' +
      '<div class="res-nom">' + r.nomVoiture + '</div>' +
      '<div class="res-sub">' + r.nomClient + ' · ' + r.telephone + '</div>' +
      '<div class="res-sub">' + r.dateDebut + ' → ' + r.dateFin + '</div>' +
      '<div class="res-stat s-' + r.statut + '">● ' + STATUTS[r.statut] + '</div>' +
      btns + '</div>';
  }).join('');
}

function changerStatut(id, s) {
  var r = reservations.find(function(x) { return x.id === id; });
  if (r) { r.statut = s; afficherReservations(); afficherToast(s==='confirme' ? 'Réservation confirmée.' : 'Réservation annulée.', s==='confirme' ? 'succes' : 'info'); }
}

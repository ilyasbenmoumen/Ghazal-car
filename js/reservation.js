// ─────────────────────────────────────────
// reservation.js — Formulaire réservation
// ─────────────────────────────────────────

function remplirSelect() {
  var sel = document.getElementById('res-voiture');
  sel.innerHTML = '<option value="">Choisir un véhicule</option>';
  voitures.filter(function(v) { return v.disponible; }).forEach(function(v) {
    sel.innerHTML += '<option value="' + v.id + '">' + v.nom + ' — ' + v.prix + ' MAD/jour</option>';
  });
}

function envoyerReservation() {
  var id    = document.getElementById('res-voiture').value;
  var nom   = document.getElementById('res-nom').value.trim();
  var tel   = document.getElementById('res-tel').value.trim();
  var debut = document.getElementById('res-debut').value;
  var fin   = document.getElementById('res-fin').value;

  if (!id || !nom || !tel || !debut || !fin) {
    afficherToast('Veuillez remplir tous les champs.', 'erreur');
    return;
  }

  var v = voitures.find(function(x) { return x.id === id; });
  reservations.push({ id: Date.now().toString(), idVoiture: id, nomVoiture: v ? v.nom : '', nomClient: nom, telephone: tel, dateDebut: debut, dateFin: fin, statut: 'attente' });

  afficherToast('Réservation envoyée avec succès !', 'succes');
  ['res-voiture','res-nom','res-tel','res-debut','res-fin'].forEach(function(x) { document.getElementById(x).value = ''; });
}

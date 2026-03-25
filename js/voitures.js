// ─────────────────────────────────────────
// voitures.js — Affichage des voitures
// ─────────────────────────────────────────

function carteVoiture(v) {
  return '<div class="carte-v" onclick="voirDetail(\'' + v.id + '\')">' +
    '<div class="v-img">' +
      '<img src="' + v.image + '" alt="' + v.nom + '" loading="lazy" />' +
      '<div class="v-voile"></div>' +
      '<div class="v-cat">' + v.categorie + '</div>' +
      (!v.disponible ? '<div class="v-indispo"><span>Indisponible</span></div>' : '') +
    '</div>' +
    '<div class="v-infos">' +
      '<div class="v-nom">' + v.nom + '</div>' +
      '<div class="v-specs">' +
        '<span>👥 ' + v.places + ' places</span>' +
        '<span>⚙️ ' + v.transmission + '</span>' +
        '<span>⛽ ' + v.carburant + '</span>' +
      '</div>' +
      '<div class="v-pied">' +
        '<div><span class="v-prix">' + v.prix + '</span> <span class="v-prix-u">MAD/jour</span></div>' +
        (v.disponible ? '<button class="btn btn-or btn-sm" onclick="event.stopPropagation();allerVers(\'reservation\')">Réserver</button>' : '') +
      '</div>' +
    '</div>' +
  '</div>';
}

function afficherAccueil() {
  var g = document.getElementById('voitures-accueil');
  g.innerHTML = voitures.slice(0, 3).map(carteVoiture).join('') || '<p style="text-align:center;color:var(--gris2)">Aucun véhicule.</p>';
}

function afficherFlotte() {
  var g = document.getElementById('voitures-flotte');
  g.innerHTML = voitures.map(carteVoiture).join('') || '<p style="text-align:center;color:var(--gris2)">Aucun véhicule.</p>';
}

function voirDetail(id) { allerVers('detail', id); }

function afficherDetail(id) {
  var v = voitures.find(function(x) { return x.id === id; });
  if (!v) { allerVers('404'); return; }
  document.getElementById('contenu-detail').innerHTML =
    '<div class="d-img">' +
      '<img src="' + v.image + '" alt="' + v.nom + '" />' +
      '<div class="d-img-voile"></div>' +
      '<div class="d-dispo ' + (v.disponible ? 'd-oui' : 'd-non') + '">' + (v.disponible ? '✔ Disponible' : '✖ Indisponible') + '</div>' +
      '<div class="v-cat">' + v.categorie + '</div>' +
    '</div>' +
    '<div class="d-infos">' +
      '<div><h1 class="d-nom">' + v.nom + '</h1>' +
      '<p class="d-desc">Découvrez le plaisir de conduire avec notre ' + v.nom + '. Un véhicule alliant confort, performance et fiabilité pour tous vos trajets au Maroc.</p></div>' +
      '<div class="d-prix-box">' +
        '<div style="display:flex;align-items:flex-end;gap:8px">' +
          '<span class="d-prix">' + v.prix + '</span>' +
          '<span class="d-prix-u">MAD / jour</span>' +
        '</div>' +
        '<p class="d-prix-note">Tarif tout inclus • Aucun frais caché</p>' +
      '</div>' +
      '<div class="grille-specs">' +
        '<div class="spec"><div class="spec-i">👥</div><div class="spec-l">Places</div><div class="spec-v">' + v.places + ' pers.</div></div>' +
        '<div class="spec"><div class="spec-i">⚙️</div><div class="spec-l">Transmission</div><div class="spec-v">' + v.transmission + '</div></div>' +
        '<div class="spec"><div class="spec-i">⛽</div><div class="spec-l">Carburant</div><div class="spec-v">' + v.carburant + '</div></div>' +
        '<div class="spec"><div class="spec-i">🛡️</div><div class="spec-l">Assurance</div><div class="spec-v">Tous risques</div></div>' +
        '<div class="spec"><div class="spec-i">📏</div><div class="spec-l">Kilométrage</div><div class="spec-v">Illimité</div></div>' +
        '<div class="spec"><div class="spec-i">⭐</div><div class="spec-l">Catégorie</div><div class="spec-v">' + v.categorie + '</div></div>' +
      '</div>' +
      (v.disponible ? '<button class="btn btn-or" style="width:100%;justify-content:center;padding:16px" onclick="allerVers(\'reservation\')">Réserver maintenant</button>' : '') +
    '</div>';
}

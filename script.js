async function loadContent() {
  try {
    const res = await fetch('content.json', {cache: "no-store"});
    if (!res.ok) throw new Error('Failed to load content.json: ' + res.status);
    const data = await res.json();
    renderSite(data);
  } catch (err) {
    document.getElementById('main').innerHTML = `<p>Error loading site content.</p>`;
    console.error(err);
  }
}

function renderSite(data) {
  document.getElementById('siteTitle').textContent = data.siteTitle || 'Local Trails';
  document.getElementById('intro').textContent = data.intro || '';

  const list = document.getElementById('trail-list');
  list.innerHTML = '';

  (data.trails || []).forEach(trail => {
    const card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;
    card.innerHTML = `
      <img loading="lazy" alt="${trail.name}" src="${trail.image}">
      <div class="card-body">
        <h3 class="card-title">${trail.name}</h3>
        <div class="card-sub">${trail.distance} • ${trail.difficulty}</div>
        <p class="card-summary">${trail.summary || ''}</p>
      </div>`;
    card.addEventListener('click', () => openModal(trail));
    card.addEventListener('keyup', (e) => { if (e.key === 'Enter') openModal(trail); });
    list.appendChild(card);
  });
}

function openModal(trail) {
  const modal = document.getElementById('modal');
  const body = document.getElementById('modal-body');
  body.innerHTML = `
    <h2>${trail.name}</h2>
    <img src="${trail.image}" alt="${trail.name}" style="max-width:100%;height:auto;border-radius:8px;margin:10px 0;">
    <p><strong>Distance:</strong> ${trail.distance}</p>
    <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
    <p>${trail.details || ''}</p>
  `;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');

  document.getElementById('closeBtn').focus();
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'modal' || e.target.id === 'closeBtn') closeModal();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

loadContent();

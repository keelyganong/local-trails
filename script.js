fetch("content.json")
  .then(res => res.json())
  .then(trails => {
    const grid = document.getElementById("trail-grid");

    trails.forEach(trail => {
      const card = document.createElement("div");
      card.className = "trail-card";

      card.innerHTML = `
        <img src="${trail.image}" alt="${trail.name}">
        <h3>${trail.name}</h3>
        <p class="trail-details">${trail.distance} • ${trail.difficulty}</p>
        <p class="trail-details">${trail.description}</p>
      `;

      grid.appendChild(card);
    });
  })
  .catch(err => console.error("Error loading trails:", err));

// Initialize map centered over Bulgaria
const map = L.map('map').setView([42.7339, 25.4858], 7);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Initial static incident data (with fixed IDs)
const baseStaticIncidents = [
  {
    id: 'static-1',
    name: "Warehouse Fire",
    lat: 42.6977,
    lng: 23.3219,
    type: "Fire",
    team: "Alpha",
    status: "In progress"
  },
  {
    id: 'static-2',
    name: "Car Accident",
    lat: 43.2141,
    lng: 27.9147,
    type: "Accident",
    team: "Bravo",
    status: "Awaiting response"
  },
  {
    id: 'static-3',
    name: "Forest Fire",
    lat: 41.9305,
    lng: 23.4910,
    type: "Fire",
    team: "Delta",
    status: "Resolved"
  },
  {
    id: 'static-4',
    name: "Gas Leak",
    lat: 42.1431,
    lng: 24.7495,
    type: "Hazard",
    team: "Echo",
    status: "In progress"
  },
  {
    id: 'static-5',
    name: "Apartment Fire",
    lat: 43.8356,
    lng: 25.9657,
    type: "Fire",
    team: "Foxtrot",
    status: "Awaiting response"
  }
];

// Get static incidents from storage or default
function getStaticIncidents() {
  const stored = JSON.parse(localStorage.getItem("staticIncidents"));
  return Array.isArray(stored) ? stored : baseStaticIncidents;
}

// Get local dynamic incidents from storage
function getLocalIncidents() {
  const stored = JSON.parse(localStorage.getItem("incidents") || "[]");
  return stored.map((item, index) => {
    const [lat, lng] = parseLatLng(item.location);
    return {
      id: `local-${index}`,
      name: item.title,
      lat,
      lng,
      type: item.type,
      team: "Unassigned",
      status: "Reported"
    };
  }).filter(inc => inc.lat && inc.lng);
}

// Parse string "lat,lng"
function parseLatLng(str) {
  if (!str || typeof str !== "string") return [null, null];
  const parts = str.split(",").map(p => parseFloat(p.trim()));
  return parts.length === 2 && parts.every(p => !isNaN(p)) ? parts : [null, null];
}

let markers = [];

// Render all markers
function displayIncidents(filterStatus = "All") {
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  const staticIncidents = getStaticIncidents();
  const localIncidents = getLocalIncidents();
  const allIncidents = [...staticIncidents, ...localIncidents];

  const filtered = allIncidents.filter(incident =>
    filterStatus === 'All' || incident.status === filterStatus
  );

  filtered.forEach(incident => {
    const marker = L.marker([incident.lat, incident.lng]).addTo(map);

    const isStatic = incident.id.startsWith("static-");
    const isLocal = incident.id.startsWith("local-");

    const popupContent = `
      <strong>${incident.name}</strong><br>
      Type: ${incident.type}<br>
      Team: ${incident.team}<br>
      Status: ${incident.status}
      <br><button class="delete-incident-btn" data-id="${incident.id}">🗑 Delete</button>
    `;

    marker.bindPopup(popupContent);
    markers.push(marker);
  });
}

// Delete handler
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-incident-btn")) {
    const id = e.target.getAttribute("data-id");

    if (id.startsWith("static-")) {
      // Delete static incident
      let staticData = getStaticIncidents();
      staticData = staticData.filter(inc => inc.id !== id);
      localStorage.setItem("staticIncidents", JSON.stringify(staticData));
    } else if (id.startsWith("local-")) {
      const index = parseInt(id.split("-")[1]);
      let localData = JSON.parse(localStorage.getItem("incidents") || "[]");
      localData.splice(index, 1);
      localStorage.setItem("incidents", JSON.stringify(localData));
    }

    // Refresh map
    displayIncidents(document.getElementById("statusFilter").value);
  }
});

// Initial load
displayIncidents("All");

// Filter control
document.getElementById("statusFilter").addEventListener("change", function () {
  displayIncidents(this.value);
});
// Reset static incidents button
document.getElementById("resetIncidentsBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to reset static incidents to defaults?")) {
    localStorage.removeItem("staticIncidents");
    displayIncidents(document.getElementById("statusFilter").value);
  }
});

// Initialize map centered over Bulgaria
const map = L.map('map').setView([42.7339, 25.4858], 7);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Incident data
const incidents = [
  {
    name: "Warehouse Fire",
    lat: 42.6977,
    lng: 23.3219,
    type: "Fire",
    team: "Alpha",
    status: "In progress"
  },
  {
    name: "Car Accident",
    lat: 43.2141,
    lng: 27.9147,
    type: "Accident",
    team: "Bravo",
    status: "Awaiting response"
  },
  {
    name: "Forest Fire",
    lat: 41.9305,
    lng: 23.4910,
    type: "Fire",
    team: "Delta",
    status: "Resolved"
  },
  {
    name: "Gas Leak",
    lat: 42.1431,
    lng: 24.7495,
    type: "Hazard",
    team: "Echo",
    status: "In progress"
  },
  {
    name: "Apartment Fire",
    lat: 43.8356,
    lng: 25.9657,
    type: "Fire",
    team: "Foxtrot",
    status: "Awaiting response"
  }
];

let markers = [];

// Function to display markers
function displayIncidents(filterStatus) {
  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  const filtered = incidents.filter(incident =>
    filterStatus === 'All' || incident.status === filterStatus
  );

  filtered.forEach(incident => {
    const marker = L.marker([incident.lat, incident.lng]).addTo(map);
    marker.bindPopup(`
      <strong>${incident.name}</strong><br>
      Type: ${incident.type}<br>
      Team: ${incident.team}<br>
      Status: ${incident.status}
    `);
    markers.push(marker);
  });
}

// Initial load
displayIncidents("All");

// Handle dropdown changes
document.getElementById("statusFilter").addEventListener("change", function () {
  const selectedStatus = this.value;
  displayIncidents(selectedStatus);
});

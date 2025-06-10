const vehicleData = [
  {
    id: "V001",
    type: "Fire Truck #7",
    team: "Team Alpha",
    status: "Available",
    last_updated: "2025-06-08 14:20"
  },
  {
    id: "V002",
    type: "Rescue Vehicle #4",
    team: "Team Bravo",
    status: "In Use",
    last_updated: "2025-06-08 13:45"
  },
  {
    id: "V003",
    type: "Water Tanker #13",
    team: "Team Charlie",
    status: "Maintenance",
    last_updated: "2025-06-08 12:10"
  },
  {
    id: "V004",
    type: "Fire Truck #2",
    team: "Team Delta",
    status: "In Use",
    last_updated: "2025-06-08 14:00"
  },
  {
    id: "V005",
    type: "Command Unit #5",
    team: "Team Echo",
    status: "Available",
    last_updated: "2025-06-08 13:15"
  },
  {
    id: "V006",
    type: "Rescue Vehicle #6",
    team: "Team Foxtrot",
    status: "Maintenance",
    last_updated: "2025-06-08 11:50"
  },
  {
    id: "V007",
    type: "Fire Truck #9",
    team: "Team Golf",
    status: "In Use",
    last_updated: "2025-06-08 14:25"
  },
  {
    id: "V008",
    type: "Water Tanker #8",
    team: "Team Hotel",
    status: "Available",
    last_updated: "2025-06-08 10:40"
  },
  {
    id: "V009",
    type: "Ladder Truck #3",
    team: "Team India",
    status: "In Use",
    last_updated: "2025-06-08 13:55"
  }
];

// Map status to badge color
function getStatusClass(status) {
  switch (status) {
    case "Available":
      return "status-green";
    case "In Use":
      return "status-red";
    case "Maintenance":
      return "status-yellow";
    default:
      return "status-gray";
  }
}

// Render vehicle data into the table
function renderVehicles(data) {
  const tbody = document.getElementById("vehicleTableBody");
  tbody.innerHTML = "";

  data.forEach(vehicle => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${vehicle.id}</td>
      <td>${vehicle.type}</td>
      <td>${vehicle.team}</td>
      <td><span class="status ${getStatusClass(vehicle.status)}">${vehicle.status}</span></td>
      <td>${vehicle.last_updated}</td>
    `;

    tbody.appendChild(row);
  });
}

// Initialize rendering and filtering
document.addEventListener("DOMContentLoaded", () => {
  const filter = document.getElementById("statusFilter");

  if (filter) {
    filter.addEventListener("change", () => {
      const selected = filter.value;
      if (selected === "All") {
        renderVehicles(vehicleData);
      } else {
        const filtered = vehicleData.filter(v => v.status === selected);
        renderVehicles(filtered);
      }
    });
  }

  renderVehicles(vehicleData);
});

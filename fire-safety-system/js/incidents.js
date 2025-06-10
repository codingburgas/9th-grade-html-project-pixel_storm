document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("incidentForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;

    const newIncident = {
      id: `INC${Date.now()}`,
      title,
      type,
      description,
      location,
      timestamp: new Date().toISOString()
    };

    // Get existing incidents or initialize empty array
    const incidents = JSON.parse(localStorage.getItem("incidents") || "[]");

    // Add new one
    incidents.push(newIncident);

    // Save to localStorage
    localStorage.setItem("incidents", JSON.stringify(incidents));

    // Redirect or notify
    alert("Incident reported successfully!");
    form.reset();
    window.location.href = "map.html"; // Optional redirect
  });
});

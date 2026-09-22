const MAX_DEPTH = 20;

const thresholds = {
  medium: 5,
  high: 12
};

let currentDepth = 3;

let chartLabels = ["Start"];
let chartData = [currentDepth];

const depthValue = document.getElementById("depthValue");
const depthProgress = document.getElementById("depthProgress");
const levelBadge = document.getElementById("levelBadge");
const statusTitle = document.getElementById("statusTitle");
const statusDescription = document.getElementById("statusDescription");
const lastUpdate = document.getElementById("lastUpdate");

const mapWarning = document.getElementById("mapWarning");
const routeAStatus = document.getElementById("routeAStatus");
const routeRecommendation = document.getElementById("routeRecommendation");

const emergencyBadge = document.getElementById("emergencyBadge");
const rescueStatus = document.getElementById("rescueStatus");
const hospitalStatus = document.getElementById("hospitalStatus");
const emergencyMessage = document.getElementById("emergencyMessage");


// -----------------------------
// 1. WATER LEVEL CALCULATION
// -----------------------------

function getWaterLevel(depth) {

  if (depth >= thresholds.high) {
    return "HIGH";
  }

  if (depth >= thresholds.medium) {
    return "MEDIUM";
  }

  return "LOW";
}


// -----------------------------
// 2. UPDATE DASHBOARD
// -----------------------------

function updateDashboard() {

  const level = getWaterLevel(currentDepth);

  depthValue.textContent = currentDepth.toFixed(1);

  const percentage = Math.min(
    (currentDepth / MAX_DEPTH) * 100,
    100
  );

  depthProgress.style.width = percentage + "%";

  levelBadge.textContent = level;

  levelBadge.className = "level-badge " + level.toLowerCase();

  if (level === "LOW") {

    statusTitle.textContent = "Normal Water Level";

    statusDescription.textContent =
      "Water level is within the normal range.";

  }

  else if (level === "MEDIUM") {

    statusTitle.textContent = "Water Level Rising";

    statusDescription.textContent =
      "Water level has reached the medium threshold.";

  }

  else {

    statusTitle.textContent = "Flood Warning";

    statusDescription.textContent =
      "High water level detected. Avoid the affected route.";

  }

  updateRouteSafety(level);

  updateLastUpdate();

}


// -----------------------------
// 3. ROUTE SAFETY
// -----------------------------

function updateRouteSafety(level) {

  if (level === "HIGH") {

    routeAStatus.textContent = "BLOCKED — FLOOD";

    mapWarning.textContent =
      "🔴 Route A: FLOODED";

    mapWarning.style.background = "#fee2e2";
    mapWarning.style.color = "#991b1b";

    routeRecommendation.textContent =
      "⚠️ Avoid Route A. Use Route B as the alternative demo route.";

  }

  else if (level === "MEDIUM") {

    routeAStatus.textContent = "CAUTION";

    mapWarning.textContent =
      "🟡 Route A: CAUTION";

    mapWarning.style.background = "#fef3c7";
    mapWarning.style.color = "#92400e";

    routeRecommendation.textContent =
      "⚠️ Water level rising. Monitor Route A carefully.";

  }

  else {

    routeAStatus.textContent = "Available";

    mapWarning.textContent =
      "🟢 Route A: Normal";

    mapWarning.style.background = "#dcfce7";
    mapWarning.style.color = "#166534";

    routeRecommendation.textContent =
      "All demo routes are currently available.";

  }

}


// -----------------------------
// 4. ADD WATER SIMULATION
// -----------------------------

document.getElementById("simulateBtn")
  .addEventListener("click", function() {

    if (currentDepth < MAX_DEPTH) {

      currentDepth += 2;

      if (currentDepth > MAX_DEPTH) {
        currentDepth = MAX_DEPTH;
      }

    }

    chartLabels.push(chartLabels.length + 1);

    chartData.push(currentDepth);

    if (chartLabels.length > 15) {

      chartLabels.shift();
      chartData.shift();

    }

    waterChart.update();

    updateDashboard();

  });


// -----------------------------
// 5. CHART
// -----------------------------

const ctx = document.getElementById("waterChart");

const waterChart = new Chart(ctx, {

  type: "line",

  data: {

    labels: chartLabels,

    datasets: [

      {

        label: "Water Depth (cm)",

        data: chartData,

        borderWidth: 3,

        tension: 0.3,

        fill: true

      }

    ]

  },

  options: {

    responsive: true,

    maintainAspectRatio: false,

    scales: {

      y: {

        beginAtZero: true,

        max: MAX_DEPTH,

        title: {

          display: true,

          text: "Depth (cm)"

        }

      },

      x: {

        title: {

          display: true,

          text: "Reading Number"

        }

      }

    }

  }

});


// -----------------------------
// 6. LAST UPDATE TIME
// -----------------------------

function updateLastUpdate() {

  const now = new Date();

  lastUpdate.textContent =
    now.toLocaleTimeString();

}


// -----------------------------
// 7. EMERGENCY ALERT SIMULATION
// -----------------------------

document.getElementById("emergencyBtn")
  .addEventListener("click", function() {

    emergencyBadge.textContent = "SIMULATED ALERT";

    emergencyBadge.style.background = "#fee2e2";
    emergencyBadge.style.color = "#991b1b";

    rescueStatus.textContent = "Alert Prepared";

    hospitalStatus.textContent = "Alert Prepared";

    emergencyMessage.textContent =
      "Demo alert generated for rescue team and hospital coordination.";

  });


// -----------------------------
// 8. INITIAL LOAD
// -----------------------------

updateDashboard();

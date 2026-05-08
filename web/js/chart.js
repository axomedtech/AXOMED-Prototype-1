let chart;

function updateChart(history) {
  const labels = history.map((_, i) => i);
  const data = history.map(d => d.bpm);

  if (!chart) {
    chart = new Chart(document.getElementById("chart"), {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "BPM",
          data: data,
          borderColor: "cyan"
        }]
      }
    });
  } else {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
  }
}
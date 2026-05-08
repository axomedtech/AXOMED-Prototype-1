async function loadData() {

  const res = await fetch("/sensor");
  const live = await res.json();

  updateUI(live);
  updateStatus(live.bpm);

  const res2 = await fetch("/history");
  const history = await res2.json();

  updateChart(history);
}

setInterval(loadData, 2000);
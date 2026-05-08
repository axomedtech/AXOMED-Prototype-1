async function loadTable() {

  const res = await fetch("/history");
  const data = await res.json();

  const table = document.getElementById("table");

  table.innerHTML += data.map(d => `
    <tr>
      <td>${d.id}</td>
      <td>${d.bpm}</td>
      <td>${d.body_temp}</td>
    </tr>
  `).join("");
}

loadTable();
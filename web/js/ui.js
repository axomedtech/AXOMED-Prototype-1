function updateUI(data) {
  document.getElementById("bpm").innerText = data.bpm;
  document.getElementById("bodyTemp").innerText = data.bodyTemp;
  document.getElementById("roomTemp").innerText = data.roomTemp;
  document.getElementById("humidity").innerText = data.humidity;
}

function updateStatus(bpm) {
  const box = document.getElementById("statusBox");

  if (bpm > 120) {
    box.innerText = "CRITICAL";
    box.style.background = "red";
  } else if (bpm > 100) {
    box.innerText = "WARNING";
    box.style.background = "orange";
  } else {
    box.innerText = "NORMAL";
    box.style.background = "green";
  }
}
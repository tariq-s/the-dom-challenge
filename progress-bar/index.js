const barElement = document.getElementsByClassName("bar")[0];
const buttonElement = document.getElementsByTagName("button")[0];

let queueSize = 0;
const timerDelay = 1;

let isRunning = false;

function animate() {
  isRunning = true;
  if (queueSize == 0) {
    isRunning = false;
    return;
  }

  let percentComplete = 0;
  const interval = setInterval(function () {
    percentComplete += 1;
    barElement.style.width = `${percentComplete}%`;
    if (percentComplete == 100) {
      clearInterval(interval);
      queueSize -= 1;
      buttonElement.textContent = `Run ${queueSize ? queueSize : ""}`;
      animate();
    }
  }, timerDelay * 10);
}

buttonElement.onclick = async function () {
  queueSize++;
  buttonElement.textContent = `Run ${queueSize ? queueSize : ""}`;
  if (!isRunning) animate();
};

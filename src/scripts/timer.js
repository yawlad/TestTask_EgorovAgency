function addTimer() {
  function formatDateTime(obj) {
    obj = String(obj);
    const result = obj.length >= 2 ? obj : `0${obj}`;
    return result;
  }
  function timer() {
    const now = new Date().getTime();

    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysContainer.textContent = formatDateTime(days);
    hoursContainer.textContent = formatDateTime(hours);
    minutesContainer.textContent = formatDateTime(minutes);
    secondsContainer.textContent = formatDateTime(seconds);

    if (distance < 0) {
      clearInterval(timerInterval);
    }
  }

  const countdownDate = new Date("May 31, 2023 00:00:00").getTime();
  const daysContainer = document.getElementById("days");
  const hoursContainer = document.getElementById("hours");
  const minutesContainer = document.getElementById("minutes");
  const secondsContainer = document.getElementById("seconds");

  timer();
  const timerInterval = setInterval(timer, 1000);
}

addTimer();

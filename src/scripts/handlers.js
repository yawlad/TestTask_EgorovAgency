function addHandlers() {
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function createPopUp(head, message) {
    const popUp = document.createElement("div");
    popUp.classList.add("pop__up__bg");
    const popUpContent = document.createElement("div");
    popUpContent.classList.add("pop__up");
    const cross = document.createElement("div");
    cross.classList.add("pop__up__cross");
    const header = document.createElement("h3");
    header.classList.add("pop__up__header");
    header.textContent = head;
    const paragraph = document.createElement("p");
    paragraph.classList.add("pop__up__paragraph");
    paragraph.textContent = message;
    const closeButton = document.createElement("button");
    closeButton.classList.add("pop__up__button");
    closeButton.textContent = "Close";

    function closePopUp() {
      popUp.style.opacity = 0;
      setTimeout(() => {
        popUp.remove();
        delete popUp;
      }, 500);
    }

    cross.addEventListener("click", closePopUp);
    closeButton.addEventListener("click", closePopUp);

    popUpContent.append(cross);
    popUpContent.append(header);
    popUpContent.append(paragraph);
    popUpContent.append(closeButton);
    popUp.append(popUpContent);
    document.body.append(popUp);
  }

  const form = document.getElementById("email_form");
  const emailInput = document.querySelector(".email__input");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    if (!email || !isValidEmail(email)) {
      createPopUp(
        CONSTANTS_MODULE.POP_UP.INVALID_EMAIL,
        CONSTANTS_MODULE.POP_UP.INVALID_EMAIL_MESSAGE
      );
      return;
    }

    fetch("/", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 200) {
          createPopUp(
            CONSTANTS_MODULE.POP_UP.SUCCESS,
            CONSTANTS_MODULE.POP_UP.SUCCESS_MESSAGE
          );
        } else {
          createPopUp(
            CONSTANTS_MODULE.POP_UP.ERROR,
            CONSTANTS_MODULE.POP_UP.ERROR_MESSAGE
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

  document
    .getElementById("events_collection")
    .addEventListener("click", (event) => {
      eventItem = event.target.closest(".event");
      if (!eventItem) return;
      document
        .querySelectorAll(".event")
        .forEach((item) => item.classList.add("not__active"));
      eventItem.classList.toggle("not__active");
    });
}

addHandlers();
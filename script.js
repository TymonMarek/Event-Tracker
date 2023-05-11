// Elements //
const eventTemplate = document.querySelector("#eventCard").innerHTML;
const addEventForm = document.querySelector("#addEventForm");
const eventList = document.querySelector("#eventList");

// Variables //
const events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];
let debounce = false;

// Functions //
const saveEvent = (event) => {
  events.push(event);
  localStorage.setItem("events", JSON.stringify(events));
};

const getEvents = () => {
  return events;
};

const deleteEvent = (id) => {
  const index = events.findIndex((event) => event.id === id);
  events.splice(index, 1);
  localStorage.setItem("events", JSON.stringify(events));
};

const renderEvents = () => {
  const events = getEvents();
  eventList.innerHTML = "";

  events.forEach((event) => {
    const eventElement = document.createElement("div");
    eventElement.innerHTML = eventTemplate;
    eventElement.classList.add("container");
    eventElement.classList.add("event");
    eventList.appendChild(eventElement);

    const eventName = eventElement.querySelector(".title");
    const eventTime = eventElement.querySelector(".time");
    const eventLocation = eventElement.querySelector(".location");
    const eventDescription = eventElement.querySelector(".description");
    const cancelButton = eventElement.querySelector(".cancel");

    eventName.innerHTML = event.name;
    eventTime.innerHTML = event.time;
    eventLocation.innerHTML = event.location;
    eventDescription.innerHTML = event.description;

    cancelButton.addEventListener("click", () => {
      deleteEvent(event.id);
      renderEvents();
    });
  });
};

// Event Listeners //
addEventForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = event.target.elements.eventName.value;
  const time = event.target.elements.eventTime.value;
  const location = event.target.elements.eventLocation.value;
  const description = event.target.elements.eventDescription.value;

  if (name == "") {
    event.target.elements.eventName.classList.add("invalid");

    setTimeout(() => {
      event.target.elements.eventName.classList.remove("invalid");
    }, 5000);
  }

  if (time == "") {
    event.target.elements.eventTime.classList.add("invalid");
    setTimeout(() => {
      event.target.elements.eventTime.classList.remove("invalid");
    }, 5000);
  }

  if (location == "") {
    event.target.elements.eventLocation.classList.add("invalid");

    setTimeout(() => {
      event.target.elements.eventLocation.classList.remove("invalid");
    }, 5000);
  }

  if (description == "") {
    event.target.elements.eventDescription.classList.add("invalid");

    setTimeout(() => {
      event.target.elements.eventDescription.classList.remove("invalid");
    }, 5000);
  }

  if (name == "" || time == "" || location == "" || description == "") {
    return;
  }

  if (debounce) {
    return;
  }

  debounce = true;

  const localEvent = {
    id: Math.random().toString(36),
    name: name,
    time: time.replace("T", " "),
    location: location,
    description: description,
  };

  saveEvent(localEvent);
  renderEvents();

  event.target.elements.eventName.value = "";
  event.target.elements.eventTime.value = "";
  event.target.elements.eventLocation.value = "";
  event.target.elements.eventDescription.value = "";
  event.target.elements.eventName.focus();

  setTimeout(() => {
    debounce = false;
  }, 1000);
});

document.addEventListener("DOMContentLoaded", () => {
  renderEvents();
});

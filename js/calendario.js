const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const week = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado"];


const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const eventsArr = [];
getEvents();
console.log(eventsArr);

//función para agregar días en días con clase día y fecha anterior fecha 
//siguiente en el mes anterior y el mes siguiente días y activo en hoy
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //verificar si el evento está presente ese día
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

//Función para agregar mes y año en los botones anterior y siguiente
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//Función para agregar activo el día
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //Eliminar actividad
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //Si hace clic en la fecha anterior o la fecha siguiente, cambie a ese mes
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //Agregar activo al día en que se hizo clic después del mes es cambio
        setTimeout(() => {
          //Agergar actividad donde no hay fecha anterior o próxima
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //Agregar actividad al día en que se hizo click despupes de que se modifique el mes
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("aqui");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Fecha Invalida");
}

//Función obtener día activo nombre del día y fecha y actualizar día del evento fecha del evento
function getActiveDay(date) {
  const day = new Date(year, month, date);
  eventDay.innerHTML = week[day.getDay()];
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//Función de actualización de eventos cuando un día está activo
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Eventos</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

//Función para agregar evento
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

//50 caracteres en el título del evento
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

function defineProperty() {
  var osccred = document.createElement("div");
  osccred.style.position = "absolute";
  osccred.style.bottom = "0";
  osccred.style.right = "0";
  osccred.style.fontSize = "10px";
  osccred.style.color = "#ccc";
  osccred.style.fontFamily = "sans-serif";
  osccred.style.padding = "5px";
  osccred.style.background = "#fff";
  osccred.style.borderTopLeftRadius = "5px";
  osccred.style.borderBottomRightRadius = "5px";
  osccred.style.boxShadow = "0 0 5px #ccc";
  document.body.appendChild(osccred);
}

defineProperty();

//Permitir solo tiempo en el evento inicio y fin
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

//Función para agregar evento a ArraiEvents
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Por favor rellene todos los campos");
    return;
  }

  //Comprobar el formato de hora correcto 24 horas
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Formato de hora no válido");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  //Comprobar si el evento ya está añadido
  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Evento ya añadido");
    return;
  }
  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };
  console.log(newEvent);
  console.log(activeDay);
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  console.log(eventsArr);
  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  updateEvents(activeDay);
  //Seleccionar el día activo y agregar la clase de evento si no se agregó
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});

//Función para eliminar un evento al hacer click en él
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    if (confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      const eventTitle = e.target.children[0].children[1].innerHTML;
      eventsArr.forEach((event) => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.title === eventTitle) {
              event.events.splice(index, 1);
            }
          });
          //Si no quedan eventos en un día, elimine ese día de EventsArr
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            //Eliminar la clase de evento del día.
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      updateEvents(activeDay);
    }
  }
});

//Función para guardar eventos en el almacenamiento local
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

//Función para obtener eventos del almacenamiento local
function getEvents() {
  //Comprobar si los eventos ya están guardados en el almacenamiento local y luego devuelve el evento; de lo contario
  //no pasa nada
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

function convertTime(time) {
  //Convertir hora a formato de 24 horas
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}
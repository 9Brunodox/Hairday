import dayjs from "dayjs";

const form = document.querySelector("form");
const selectedDate = document.getElementById("date");

const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

// Carrega a data atual
selectedDate.value = inputToday;

// Define a data mínima como sendo a data atual.
selectedDate.min = inputToday;

form.onsubmit = (event) => {
  // Previne o comportamento padrão de carregar a página.
  event.preventDefault();

  console.log("ENVIADO!");
};

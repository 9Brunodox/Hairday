import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";
import { hoursClick } from "./hours-click.js";

const hours = document.getElementById("hours");

export function hoursLoad({ date }) {
  const opening = openingHours.map((hour) => {
    // Mapeia o openingHours e retorna cada hora em "hour"
    // Recupera somente a hora
    const [scheduleHour] = hour.split(":");

    // Adiciona a hora na data e verifica se está no passado
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isAfter(dayjs()); // Pega a data e horário de hoje e verifica se o horário "isAfter" ou seja, se os horários disponíveis são depois do horário atual
    console.log(scheduleHour, isHourPast);

    // Define se o horário está disponível
    return {
      hour,
      available: isHourPast,
    };
  });

  // Renderiza os horários
  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li");

    li.classList.add("hour");
    li.classList.add(available ? "hour-available" : "hour-unavailable");

    li.textContent = hour;

    if (hour === "9:00") {
      hoursHeaderAdd("Manhã");
    } else if (hour === "13:00") {
      hoursHeaderAdd("Tarde");
    } else if (hour === "18:00") {
      hoursHeaderAdd("Noite");
    }

    hours.append(li);
  });

  // Adiciona um evento de click nos horários disponíveis
  hoursClick();
}

function hoursHeaderAdd(title) {
  const header = document.createElement("li");
  header.classList.add("hour-period");
  header.textContent = title;

  hours.append(header);
}

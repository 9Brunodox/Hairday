import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";
import { hoursClick } from "./hours-click.js";

const hours = document.getElementById("hours");

export function hoursLoad({ date, dailySchedules }) {
  
  // Limpa a lista de horários
  hours.innerHTML = ""

  const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm"))

  // Mapeia o openingHours e retorna cada horário no formato "hh:mm"
  const opening = openingHours.map((hour) => {
    // Separa a hora e os minutos
    const [scheduleHour, scheduleMinute] = hour.split(":").map(Number);

    // Cria um horário novo juntando as horas e minutos atuais
    const scheduleTime = dayjs(date)
      .hour(scheduleHour) // Define a hora
      .minute(scheduleMinute) // Define os minutos
      .second(0); // Zera os segundos para precisão

    // Verifica se o horário combinado ainda é futuro em relação ao momento atual
    const isHourAfter = scheduleTime.isAfter(dayjs()); 
    
    const available = !unavailableHours.includes(hour) && isHourAfter// Pega a data e horário de hoje e verifica se o horário "isAfter" ou seja, se os horários disponíveis são depois do horário atual

    // Define se o horário está disponível
    return {
      hour,
      available,
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

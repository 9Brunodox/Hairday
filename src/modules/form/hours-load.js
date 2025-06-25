import dayjs from "dayjs"
import { openingHours } from "../../utils/opening-hours.js"

export function hoursLoad({ date }){
    const opening = openingHours.map((hour) => { // Mapeia o openingHours e retorna cada hora em "hour"
        // Recupera somente a hora
        const [scheduleHour] = hour.split(":")

        // Adiciona a hora na data e verifica se está no passado
        const isHourPast = dayjs(date).add(scheduleHour, "hour").isAfter(dayjs()) // Pega a data e horário de hoje e verifica se o horário "isAfter" ou seja, se os horários disponíveis são depois do horário atual
        console.log(scheduleHour, isHourPast)

        // Define se o horário está disponível
        return{
            hour,
            available: isHourPast
        }
    })
}
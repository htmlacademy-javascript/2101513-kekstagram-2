import {timeToMinutes} from './utils.js';

/**
 * Проверяет, укладывается ли встреча в рамки рабочего дня.
 * * @param {string} workdayStart - Время начала рабочего дня (например, '8:00').
 * @param {string} workdayEnd - Время окончания рабочего дня (например, '17:30').
 * @param {string} meetingStart - Время начала встречи (например, '14:00').
 * @param {number} meetingDuration - Продолжительность встречи в минутах (например, 90).
 * @returns {boolean} True, если встреча полностью в рабочем дне, иначе False.
 */
export function isMeetingInWorkday(workdayStart, workdayEnd, meetingStart, meetingDuration) {
  const workdayStartMinutes = timeToMinutes(workdayStart);
  const workdayEndMinutes = timeToMinutes(workdayEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  const isStartValid = meetingStartMinutes >= workdayStartMinutes;
  const isEndValid = meetingEndMinutes <= workdayEndMinutes;

  return isStartValid && isEndValid;
}


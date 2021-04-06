import _ from 'lodash';
import {getCurrentDayOfWeek, getCurrentTimeMilitaryFormat} from './time';
import {daysOfWeek} from '../models/daysOfWeek';

export const currentAvailability = (drink) => {
  const currentDay = getCurrentDayOfWeek();
  const currentTime = getCurrentTimeMilitaryFormat();
  const {Availability} = drink;
  if (Availability) {
    let available = false;
    _.forEach(Availability, (day) => {
      const {Day, Times} = day;
      //(wed 4pm-2am)
      if (Times[1] < Times[0]) {
        const currentDayIndex = daysOfWeek.indexOf(Day);
        const nextDayIndex = Day === daysOfWeek[6] ? 0 : currentDayIndex + 1;
        if (Day === currentDay) {
          if (currentTime >= Times[0] && currentTime < 24) {
            available = true;
          }
        } else if (daysOfWeek[nextDayIndex] === currentDay) {
          if (currentTime >= 0 && currentTime < Times[1]) {
            available = true;
          }
        }
      } else if (
        Day === currentDay &&
        currentTime >= Times[0] &&
        currentTime < Times[1]
      ) {
        available = true;
      }
    });
    return available;
  } else {
    const {Days, Hours} = drink;
    if (
      Days.includes(currentDay) &&
      currentTime >= Hours.Beginning &&
      currentTime < Hours.End
    ) {
      return true;
    } else {
      return false;
    }
  }
};

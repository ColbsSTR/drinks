import _ from 'lodash';
import { getCurrentDayOfWeek, getCurrentTimeMilitaryFormat } from './time';

export const currentAvailability = (drink) => {
  const currentDay = getCurrentDayOfWeek();
  const currentTime = getCurrentTimeMilitaryFormat();
  const { Availability } = drink;
  if (Availability) {
    let available = false;
    _.forEach(Availability, day => {
      const { Day, Times } = day;
      if (Day === currentDay && (currentTime >= Times[0] && currentTime < Times[1])) {
        available = true;
      }
    });
    return available;
  } else {
    const { Days, Hours } = drink;
    if(Days.includes(currentDay) && (currentTime >= Hours.Beginning && currentTime < Hours.End)) {
      return true;
    } else {
      return false;
    }
  }
}
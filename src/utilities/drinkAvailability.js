import { getCurrentDayOfWeek, getCurrentTimeMilitaryFormat } from './time';

export const currentAvailability = (drink) => {
  const { Days, Hours } = drink;
  const currentDay = getCurrentDayOfWeek();
  const currentTime = getCurrentTimeMilitaryFormat();
  if(Days.includes(currentDay) && (currentTime >= Hours.Beginning && currentTime < Hours.End)) {
    return true;
  } else {
    return false;
  }
}
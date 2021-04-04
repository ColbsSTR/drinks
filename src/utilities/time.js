import moment from 'moment';

export const getCurrentDayOfWeek = () => {
  return moment().format('dddd');
};

export const getCurrentTimeMilitaryFormat = () => {
  return moment().hour();
};

export const militaryToStandard = (time) => {
  if (time >= 12) {
    if (time % 12 === 0) {
      return time === 12 ? time + 'PM' : 12 + 'AM';
    } else {
      return (time % 12) + 'PM';
    }
  } else {
    return time + 'AM';
  }
};

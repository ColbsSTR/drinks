import moment from 'moment';

export const getCurrentDayOfWeek = () => {
    return moment().format('dddd');
}

export const getCurrentTimeMilitaryFormat = () => {
    return moment().hour();
}
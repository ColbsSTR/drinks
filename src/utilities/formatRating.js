export const formatRating = (rating) => {
    let remainder = Number.parseFloat(rating % 1).toPrecision(1);
    if(remainder >= .3 && remainder <= .7) {
      return (Math.trunc(rating) + .5);
    } else if (remainder < .3) {
      return Math.floor(rating);
    } else if (remainder > .7) {
      return Math.ceil(rating);
    }
}
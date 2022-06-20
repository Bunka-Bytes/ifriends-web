export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const stringToColour = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

export const dateDifferenceInDays = (date1, date2) => {
  const date1utc = Date.UTC(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  );
  const date2utc = Date.UTC(
		date2.getFullYear(),
		date2.getMonth(),
		date2.getDate()
	);
  let day = 1000 * 60 * 60 * 24; //milisegundos em um dia
  if ((date2utc - date1utc) < day) {
    return date2utc - date1utc;
  }
  return (date2utc - date1utc) / day;
};

export const toArray = (arr) => {
  return Array.isArray(arr) ? arr : [];
};

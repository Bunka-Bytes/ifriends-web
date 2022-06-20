import { useTranslation } from 'react-i18next';

export const isEmpty = obj => {
	return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const stringToColour = str => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	let colour = '#';
	for (let i = 0; i < 3; i++) {
		let value = (hash >> (i * 8)) & 0xff;
		colour += ('00' + value.toString(16)).substr(-2);
	}
	return colour;
};

export const dateDifferenceInSeconds = (date1, date2) => {
	const date1utc = Date.UTC(
		date1.getFullYear(),
		date1.getMonth(),
		date1.getDate(),
		date1.getHours(),
		date1.getMinutes(),
		date1.getSeconds()
	);
	const date2utc = Date.UTC(
		date2.getFullYear(),
		date2.getMonth(),
		date2.getDate(),
		date2.getHours(),
		date2.getMinutes(),
		date2.getSeconds()
	);
	let day = 1000 * 60 * 60 * 24; //milisegundos em um dia
	// if (date2utc - date1utc < day) {
	//   return date2utc - date1utc;
	// }
	return (date2utc - date1utc) / 1000;
};

export const getDateWithText = (date1, date2) => {
	let differDatesInDays = dateDifferenceInSeconds(date1, date2);

	let textDate = localStorage.getItem("i18nextLng") === "pt-BR" ? ' segundo' : ' second';

	if (differDatesInDays >= 60 * 60 * 24) {
		differDatesInDays /= 60 * 60 * 24;
		textDate = localStorage.getItem("i18nextLng") === "pt-BR" ? ' dia' : ' day';
	} else if (differDatesInDays >= 60 * 60) {
		differDatesInDays /= 60 * 60;
		textDate = localStorage.getItem("i18nextLng") === "pt-BR" ? ' hora' : ' hour';
	} else if (differDatesInDays >= 60) {
		differDatesInDays /= 60;
		textDate = localStorage.getItem("i18nextLng") === "pt-BR" ? ' minuto' : ' minute';
	}
	differDatesInDays = Math.abs(Math.floor(differDatesInDays));

  var string = localStorage.getItem("i18nextLng") === "pt-BR" ? ' atrás' : ' ago';
	const dateWithText = `${differDatesInDays}${textDate}${
		differDatesInDays > 1 ? 's' : ''
	} ${string}`;

	return dateWithText;
};

export const getBeetweenDateWithTextForApiDate = dateApi => {
	const newDataEmissao = new Date(
		dateApi[0],
		dateApi[1] - 1,
		dateApi[2],
		dateApi[3] - 3,
		dateApi[4],
		dateApi[5]
	);
	const dateToday = new Date();
	return getDateWithText(newDataEmissao, dateToday);
};

export const toArray = arr => {
	return Array.isArray(arr) ? arr : [];
};

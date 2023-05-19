export const formatDateTime = (dateTime, timezone) => {
	var date;

	date = new Date(dateTime);
	const day = date.getDate();
	const monthList = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"July",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const textMonth = monthList[date.getMonth()];
	const year = date.getFullYear();

	var hour = date.getHours();
	const minute = date.getMinutes();
	var ampm;
	if (hour >= 12) {
		ampm = "PM";
		hour = hour - 12;
	} else {
		ampm = "AM";
	}
	var sHours = hour < 10 ? `0${hour}` : hour;
	const sMinutes = minute < 10 ? `0${minute}` : minute;
	const seconds = date.getSeconds();
	const formattedTime = `${sHours}:${sMinutes}:${seconds} ${ampm}`;
	return `${day} ${textMonth}, ${year} ${formattedTime}`;
};

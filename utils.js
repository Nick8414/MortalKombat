'use strict'
export const randomNumber = (num) => Math.ceil(Math.random() * num);

export const getTime = () => {
	const now = new Date();
	const normalizedTime = (num) => (num < 10 ? '0':'') + num;
	return `${normalizedTime(now.getHours())} : ${normalizedTime(now.getMinutes())}`;
};


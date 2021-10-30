"use strict";

class Utils {
  randomNumber = (num) => Math.ceil(Math.random() * num);

  getTime = () => {
    const now = new Date();
    const normalizedTime = (num) => (num < 10 ? "0" : "") + num;
    return `${normalizedTime(now.getHours())} : ${normalizedTime(
      now.getMinutes()
    )}`;
  };
}

export default Utils;

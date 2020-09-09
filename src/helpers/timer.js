const constructTimeMMSS = (timeElapsed) => {
  let minute = Math.floor(timeElapsed / 60);
  let second = Math.floor(timeElapsed - 60 * minute);
  return `${minute < 10 ? "0" + minute : minute} : ${
    second < 10 ? "0" + second : second
  }`;
};
export { constructTimeMMSS };

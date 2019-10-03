const second = 1000;
const minute = second * 60;
const endTime = new Date(1570135200000);

const minutesReplacer = /{{minutes}}/gi;
const secondsReplacer = /{{seconds}}/gi;

function leftPad (num) {
  if (num < 0) {
    return '00';
  } else if (num < 10) {
    return `0${num}`;
  }
  return num;
}

export default function (content) {
  const currentTime = new Date();
  const timeLeft = endTime - currentTime;
  const minutesLeft = Math.floor(timeLeft / minute);
  const secondsLeft = Math.floor((timeLeft % minute) / second);

  return content.replace(minutesReplacer, leftPad(minutesLeft)).replace(secondsReplacer, leftPad(secondsLeft));
}

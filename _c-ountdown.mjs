const second = 1000;
const minute = second * 60;
const divider = ':';

function leftPad (num) {
  if (num < 0) {
    return '00';
  } else if (num < 10) {
    return `0${num}`;
  }
  return num;
}

customElements.define('c-ountdown', class extends HTMLElement {
  set endTime (date) {
    this._endTime = date;
  }

  update() {
    if (!this._endTime) {
      return;
    }
    const timeLeft = this._endTime - new Date();
    const minutesLeft = Math.floor(timeLeft / minute);
    const secondsLeft = Math.floor(timeLeft % minute / second);

    this.textContent = `${leftPad(minutesLeft)}${divider}${leftPad(secondsLeft)}`;
  }

  connectedCallback() {
    if (this.textContent && this.textContent.includes(divider)) {
      const [ _minutes, _seconds ] = this.textContent.split(divider);

      this.endTime = new Date(
        new Date().getTime() +
        parseInt(_minutes, 10) * minute +
        parseInt(_seconds, 10) * second
      );
    }

    setInterval(this.update.bind(this), second);
  }
});

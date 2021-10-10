class CountdownTimer {
  constructor({ selector, targetDate }) {
    this._init(selector, targetDate);
  }

  showTime() {
    clearInterval(this.interval);
    this.interval = setInterval(() => this._countDown(), 1000);
  }

  _resetTimer() {
    clearInterval(this.interval);
    this.daysSpan.innerText = "00";
    this.hoursSpan.innerText = "00";
    this.minutesSpan.innerText = "00";
    this.secondsSpan.innerText = "00";
  }

  _padZero(value) {
    return value < 10 ? `0${value}` : value;
  }

  _countDown() {
    const time = this.targetDate - Date.now();
    if (time <= 0) {
      this._resetTimer();
      return;
    }

    this._setSpanValue(time);
  }

  _init(selector, targetDate) {
    this.targetDate = targetDate;
    this.daysSpan = document.querySelector(
      `${selector} .value[data-value="days"]`
    );
    this.hoursSpan = document.querySelector(
      `${selector} .value[data-value="hours"]`
    );
    this.minutesSpan = document.querySelector(
      `${selector} .value[data-value="mins"]`
    );
    this.secondsSpan = document.querySelector(
      `${selector} .value[data-value="secs"]`
    );
  }

  _setSpanValue(time) {
    this.daysSpan.innerText = this._padZero(
      Math.floor(time / (1000 * 60 * 60 * 24))
    );
    this.hoursSpan.innerText = this._padZero(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    this.minutesSpan.innerText = this._padZero(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    );
    this.secondsSpan.innerText = this._padZero(
      Math.floor((time % (1000 * 60)) / 1000)
    );
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date(2021, 11, 31),
});

timer.showTime();

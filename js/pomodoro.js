import C from './constant';

export default class Pomodoro {
  constructor(config) {
    this.config = config;
    this.nPomodoro = 1;
    this.stage = undefined;
    this.second = undefined;
    this.intervalID = undefined;
  }
  start() {
    this._start(C.Stage.Pomodoro, this.config.pomodoroMin);
  }
  stop() {
    if (!!this.intervalID) {
      clearInterval(this.intervalID);
    }
    this.second = undefined;
    this._updateBadge();
  }
  _start(stage, min) {
    if (stage === C.Stage.Pomodoro) {
      this.nPomodoro++;
    }
    this.stage = stage;
    this.second = min * 60;
    if (!!this.intervalID) {
      clearInterval(this.intervalID);
    }
    this._updateBadge();
    this.intervalID = setInterval(this._tick.bind(this), 1000);
  }
  _updateBadge() {
    const color = this.stage === C.Stage.Pomodoro ? '#ff0000' : '#00cc00';
    chrome.browserAction.setBadgeBackgroundColor({ color });

    if (this.second > 60) {
      const min = Math.floor(this.second / 60);
      chrome.browserAction.setBadgeText({ text: min + 'm' });
    } else if (0 < this.second && this.second <= 60) {
      chrome.browserAction.setBadgeText({ text: this.second + 's' });
    } else {
      chrome.browserAction.setBadgeText({ text: '' });
    }
  }
  _tick() {
    this.second -= 1;
    this._updateBadge();
    if (this.second <= 0) {
      this._doNext();
    }
  }
  _doNext() {
    if (this.stage === C.Stage.Pomodoro) {
      if (this.nPomodoro % this.config.longBreakEvery === 0) {
        this._postNotification("starting long break...");
        this._start(C.Stage.LongBreak, this.config.longBreakMin);
      } else {
        this._postNotification("starting short break...");
        this._start(C.Stage.ShortBreak, this.config.shortBreakMin);
      }
    } else if (this.stage === C.Stage.ShortBreak
      || this.stage === C.Stage.LongBreak) {
      this._start(C.Stage.Pomodoro, this.config.pomodoroMin);
      this._postNotification("starting pomodoro: " + this.nPomodoro + "...");
    }
  }
  _postNotification(message) {
    if (this.config.notificationType === C.NotificationType.None) {
      // nothing to do.
    } else if (this.config.notificationType === C.NotificationType.NotificationDissappear) {
      // TODO
    } else if (this.config.notificationType === C.NotificationType.NotificationDissappear) {
      // TODO
    } else if (this.config.notificationType === C.NotificationType.Alert) {
      chrome.windows.getCurrent((window) => {
        chrome.windows.update(window.id, { focused: true }, (window) => {
          alert(message);
        });
      });
    }
  }
}

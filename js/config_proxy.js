import C from './constant';

const defaultConfig = {
  pomodoroMin: 25,
  shortBreakMin: 5,
  longBreakMin: 15,
  longBreakEvery: 4,
  notificationType: C.NotificationType.NotificationDissappear,
  goToNextPomodoro: C.GoToNextPomodoro.AfterClosingNotification
};

export default class ConfigProxy {
  constructor() {
    this.localStorageKey = 'config';
  }
  load() {
    const json = localStorage[this.localStorageKey];
    const config = !!json ? JSON.parse(json) : defaultConfig;
    return config;
  }
  save(config) {
    localStorage[this.localStorageKey] = JSON.stringify(config);
  }
}

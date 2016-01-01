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
    const config = {};
    for (var key in defaultConfig) {
      config[key] = defaultConfig[key];
    }
    const loaded = JSON.parse(json);
    for (var key in defaultConfig) {
      if (typeof loaded[key] === typeof defaultConfig[key]) {
        config[key] = loaded[key];
      }
    }
    return config;
  }
  save(config) {
    localStorage[this.localStorageKey] = JSON.stringify(config);
  }
}

const defaultConfig = {
  pomodoroMin: 25,
  shortBreakMin: 5,
  longBreakMin: 15,
  longBreakEvery: 4,
  notificationType: 2,
  goToNextPomodoro: 2
};

export default class ConfigProxy {
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
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

const defaultConfig = {
  pomodoroMin: 25,
  shortBreakMin: 5,
  longBreakMin: 15,
  longBreakEvery: 4,
  notificationType: 2,
  goToNextPomodoro: 2
};

class Options {
  constructor(document) {
    this.document = document;
  }

  element(id) {
    return this.document.getElementById(id);
  };

  draw(config) {
    this.element('pomodoro-min').value = config.pomodoroMin;
    this.element('short-break-min').value = config.shortBreakMin;
    this.element('long-break-min').value = config.longBreakMin;
    this.element('long-break-every').value = config.longBreakEvery;
    this.element('notification-type').value = config.notificationType;
    this.element('go-to-next-pomodoro').value = config.goToNextPomodoro;

    this.element('save').onclick = () => {
      const newConfig = {
        pomodoroMin:         this.element('pomodoro-min').value,
        shortBreakMin:       this.element('short-break-min').value,
        longBreakMin:        this.element('long-break-min').value,
        longBreakEvery:      this.element('long-break-every').value,
        notificationType:    this.element('notification-type').value,
        goToNextPomodoro:    this.element('go-to-next-pomodoro').value
      };
      localStorage['config'] = JSON.stringify(newConfig);
    };
  }
  main() {
    const json = localStorage['config'];
    const config = !!json ? JSON.parse(json) : defaultConfig;
    this.draw(config);
  }
}

window.onload = new Options(document).main();

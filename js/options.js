import ConfigProxy from './config_proxy';

class Options {
  constructor(document, configProxy) {
    this.document = document;
    this.configProxy = configProxy;
  }

  element(id) {
    return this.document.getElementById(id);
  };

  draw() {
    const config = this.configProxy.load();

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
      this.configProxy.save(newConfig);
    };
  }
  main() {
    this.draw();
  }
}

const configProxy = new ConfigProxy();
window.onload = new Options(document, configProxy).main();

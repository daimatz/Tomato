import ConfigProxy from './config_proxy';
import Pomodoro from './pomodoro';
import C from './constant';

class Background {
  constructor(configProxy) {
    this.configProxy = configProxy;
    this.pomodoro = undefined;
  }
  onclick(tab) {
    if (!!this.pomodoro) {
      this.pomodoro.stop();
      this.pomodoro = undefined;
    } else {
      const config = configProxy.load();
      this.pomodoro = new Pomodoro(config);
      this.pomodoro.start();
    }
  }
  main() {
    chrome.browserAction.onClicked.addListener(this.onclick.bind(this));
  }
}

const configProxy = new ConfigProxy();
new Background(configProxy).main();

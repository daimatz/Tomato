import ConfigAccessor from './config_accessor';
import Pomodoro from './pomodoro';
import C from './constant';

class Background {
  constructor(configProxy) {
    this.configProxy = configProxy;
    this.pomodoro = undefined;
  }
  onclick(tab) {
    if (!!this.pomodoro) {
      if (this.pomodoro.isRunning()) {
        this.pomodoro.pause();
      } else {
        this.pomodoro.resume();
      }
    } else {
      const config = configProxy.load();
      this.pomodoro = new Pomodoro(config);
      this.pomodoro.start();
    }
  }
  reset(info, tab) {
    if (!!this.pomodoro) {
      this.pomodoro.reset();
      this.pomodoro = undefined;
    }
  }
  main() {
    chrome.browserAction.onClicked.addListener(this.onclick.bind(this));
    chrome.contextMenus.create({
      "title": "Reset",
      "contexts": ["browser_action"],
      "onclick" : this.reset.bind(this)
    });
  }
}

const configProxy = new ConfigAccessor();
new Background(configProxy).main();

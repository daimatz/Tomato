export default class C {}

C.pomodoroFontColor = 'red';
C.breakFontColor = 'green';
C.Stage = {
  Pomodoro: 1,
  ShortBreak: 2,
  LongBreak: 3
};
C.NotificationType = {
  None: 1,
  NotificationDissappear: 2,
  NotificationNotDisappear: 3,
  Alert: 4
};
C.GoToNextPomodoro = {
  WithoutUserInteraction: 1,
  AfterClosingNotification: 2,
  AfterClickingExtensionIcon: 3
};

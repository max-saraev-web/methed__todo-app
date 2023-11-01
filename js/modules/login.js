import {MESSAGES} from './messages.js';

const {ru: {
  login,
  isExit,
}} = MESSAGES;

const exitConfirm = () => confirm(isExit);

export const logIn = () => {
  const name = prompt(login);

  if (name === null) {
    const trueLeave = exitConfirm();

    if (trueLeave) {
      return;
    } else if (trueLeave === false) {
      return logIn();
    }
  }
  if (name.trim() === '') {
    return logIn();
  }
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

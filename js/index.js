import {logIn} from './modules/login.js';
import {renderToDo} from './modules/render.js';


const init = (selector) => {
  const app = document.querySelector(selector);
  const currentUser = logIn();
  if (currentUser === undefined) {
    return;
  }
  renderToDo(app, currentUser);
};
init('.app-container');

import {addController} from './modules/addController.js';
import {formControl, rowControl} from './modules/control.js';
import {createBootstrapJs} from './modules/create.js';
import {logIn} from './modules/login.js';
import {renderTasks, renderToDo} from './modules/render.js';
import {getStorage} from './modules/storage.js';
import {countRows} from './modules/utils.js';


const init = (selector) => {
  document.head.prepend(createBootstrapJs());
  const app = document.querySelector(selector);
  const currentUser = logIn();
  if (currentUser === undefined) {
    return;
  }
  const {
    form,
    submitBtn,
    clearBtn,
    list} = renderToDo(app, currentUser);
  renderTasks(list, getStorage(currentUser));

  countRows();
  formControl(form, list, currentUser, submitBtn);
  addController(form, submitBtn, clearBtn);
  rowControl(app, currentUser);
};
init('.app-container');

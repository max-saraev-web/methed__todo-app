import {createBtn, createForm, createFormInput, createRow, createTable,
  createTitle} from './create.js';
import {MESSAGES} from './messages.js';
const {ru: {
  currentUser,
}} = MESSAGES;

export const renderToDo = (app, name) => {
  const title = createTitle(currentUser, name);

  const form = createForm();
  const formInput = createFormInput();
  const submitBtn = createBtn('submit', 'Сохранить',
    'btn', 'btn-primary', 'me-3');
  submitBtn.disabled = true;
  const clearBtn = createBtn('reset', 'Очистить',
    'btn', 'btn-warning');

  const table = createTable();


  form.append(formInput, submitBtn, clearBtn);
  app.append(title, form, table);

  return {
    form,
    formInput,
    submitBtn,
    clearBtn,
    list: table.tbody,
  };
};

export const renderTasks = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);

  return allRow;
};

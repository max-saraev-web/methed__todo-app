import {createForm, createTitle} from './create.js';
import {MESSAGES} from './messages.js';
const {ru: {
  currentUser,
}} = MESSAGES;

export const renderToDo = (app, name) => {
  const title = createTitle(currentUser, name);
  const form = createForm();
  app.append(title, form);
};

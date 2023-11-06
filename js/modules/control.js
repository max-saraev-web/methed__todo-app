import {createRow} from './create.js';
import {getStorage, setStorage} from './storage.js';
import {consciousDel, countRows, generateId} from './utils.js';
import {MESSAGES} from './messages.js';

const {ru: {
  delWarning,
}} = MESSAGES;

export const formControl = (form, list, currentUser, submitBtn) => {
  form.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = new FormData(ev.target);

    const newTask = Object.fromEntries(formData);
    const namedStorage = getStorage(currentUser);
    newTask.num = generateId();
    newTask.condition = 'В процессе';
    list.append(createRow(newTask));
    namedStorage.push(newTask);
    setStorage(namedStorage, currentUser);
    form.reset();
    submitBtn.setAttribute('disabled', 'true');
    countRows();
  });
};

export const rowControl = (app, user) => {
  app.addEventListener('click', ev => {
    const target = ev.target;

    if (target.matches('.btn-success')) {
      if (target.closest('tr').classList.contains('table-success')) {
        target.closest('tr').classList.remove('table-success');
        target.closest('tr').classList.add('table-light');
        target.closest('tr').querySelector('.task')
          .classList.remove('text-decoration-line-through');
        target.closest('tr').querySelector('.to-do__condition')
          .textContent = 'В процессе';

        const targetId = target.closest('tr').querySelector('.to-do__counter')
          .dataset.id;
        const currentStorage = getStorage(user);

        const modifiedObj = currentStorage.find(elem => elem.num === targetId);
        modifiedObj.condition = 'В процессе';

        const modifiedObjNum = currentStorage.
          findIndex(elem => elem.num === targetId);

        currentStorage[modifiedObjNum] = modifiedObj;
        setStorage(currentStorage, user);
      } else {
        target.closest('tr').classList.remove('table-light');
        target.closest('tr').classList.add('table-success');
        target.closest('tr').querySelector('.task')
          .classList.add('text-decoration-line-through');
        target.closest('tr').querySelector('.to-do__condition')
          .textContent = 'Выполнена';

        const targetId = target.closest('tr').querySelector('.to-do__counter')
          .dataset.id;
        const currentStorage = getStorage(user);

        const modifiedObj = currentStorage.find(elem => elem.num === targetId);
        modifiedObj.condition = 'Выполнена';

        const modifiedObjNum = currentStorage.
          findIndex(elem => elem.num === targetId);

        currentStorage[modifiedObjNum] = modifiedObj;
        setStorage(currentStorage, user);
      }
    }

    if (target.matches('.btn-danger')) {
      if (consciousDel(delWarning)) {
        const currentStorage = getStorage(user);
        const targetId = target.closest('tr').querySelector('.to-do__counter')
          .dataset.id;

        target.closest('.table__row').remove();

        const objNum = currentStorage.
          findIndex(elem => elem.num === targetId);

        currentStorage.splice(objNum, 1);
        setStorage(currentStorage, user);
        countRows();
      }
    }
    if (target.matches('.btn-info')) {
      const editField = target.closest('tr').querySelector('.task');
      const currentStorage = getStorage(user);
      const targetId = target.closest('tr').querySelector('.to-do__counter')
        .dataset.id;
      const objNum = currentStorage.
        findIndex(elem => elem.num === targetId);
      if (editField.getAttribute('contenteditable') === 'true') {
        editField.setAttribute('contenteditable', 'false');
        editField.style.cssText = `
          border: none;
        `;
        currentStorage[objNum].task = editField.textContent;
        setStorage(currentStorage, user);
      } else {
        const editField = target.closest('tr').querySelector('.task');
        editField.setAttribute('contenteditable', 'true');
        editField.style.cssText = `
          border: 3px solid #0DCAF0;
        `;
      }
    }
  });
};

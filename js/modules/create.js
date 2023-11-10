const createElement =
  (tag, attr, {append, appends, parent, cb} = {}) => {
    const element = document.createElement(tag);

    if (attr) {
      Object.assign(element, attr);
    }

    if (append && append instanceof HTMLElement) {
      element.append(append);
    }

    if (appends && appends.every(elem => elem instanceof HTMLElement)) {
      element.append(...appends);
    }

    if (parent && parent instanceof HTMLElement) {
      parent.append(element);
    }

    if (cb && typeof cb === 'function') {
      cb(element);
    }

    return element;
  };

export const createBtn = (type, text, ...classes) => createElement(
  'button',
  {
    type: `${type}`,
    className: classes.join(' '),
    textContent: `${text}`,
  },
);

export const createRow = ({num, task, condition,
  rank = 'Насколько задача важная ? '}) => {
  const tr = createElement(
    'tr',
    {
      className: condition === 'Выполнена' ?
        'table-success' : '',
    },
  );
  const classToAdd = () => {
    if (rank === 'Неважное дело') {
      return 'table-light';
    } else if (rank === 'Дело средней важности') {
      return 'table-warning';
    } else if (rank === 'Дело повышенной важности') {
      return 'table-danger';
    }
  };
  tr.classList.add('table__row', classToAdd());

  const tdNum = createElement(
    'td',
    {
      className: 'to-do__counter',
    },
  );
  tdNum.setAttribute('data-id', `${num}`);

  const tdTask = createElement(
    'td',
    {
      className: condition === 'Выполнена' ?
        'task text-decoration-line-through' : 'task',
      textContent: `${task}`,
    },
  );

  const tdCondition = createElement(
    'td',
    {
      textContent: `${condition}`,
      className: 'to-do__condition',
    },
  );

  const tdBtns = createElement(
    'td',
  );
  tdBtns.style.cssText = `
    display: flex;
    gap: 12px;
  `;
  const delBtn = createBtn('button', 'Удалить',
    'btn', 'btn-danger');
  const finishBtn = createBtn('button', 'Завершить',
    'btn', 'btn-success');
  const editBtn = createBtn('button', 'Редактировать',
    'btn', 'btn-info');
  const createSelect = () => {
    const selectWrap = createElement(
      'ul',
      {
        className: 'dropdown-menu',
      },
      {
        appends: [
          createElement(
            'li',
            {
              'className': 'bg-primary dropdown-item',
              'textContent': 'Неважное дело',
            },
          ),
          createElement(
            'li',
            {
              'className': 'bg-warning dropdown-item',
              'textContent': 'Дело средней важности',
            },
          ),
          createElement(
            'li',
            {
              'className': 'bg-danger dropdown-item',
              'textContent': 'Дело повышенной важности',
            },
          ),
        ],
      },
    );
    // ? - сюда нужно вставить значение свойства rank
    const dropdownBtn = createBtn(
      'button',
      rank,
      'btn',
      'btn-secondary',
      'dropdown-toggle',
    );
    dropdownBtn.setAttribute('data-bs-toggle', 'dropdown');
    const dropdown = createElement(
      'div',
      {
        className: 'dropdown',
      },
      {
        appends: [dropdownBtn, selectWrap],
      },
    );
    return dropdown;
  };
  tdBtns.append(delBtn, finishBtn, editBtn, createSelect());

  tr.append(tdNum, tdTask, tdCondition, tdBtns);

  return tr;
};

export const createTable = () => {
  const tWrap = createElement(
    'div',
    {
      className: 'table-wrapper',
    },
  );

  const table = createElement(
    'table',
    {
      className: 'table table-hover table-bordered',
    },
    {
      append: createElement(
        'thead',
        {
          innerHTML: `
            <th>№</th>
            <th>Задача</th>
            <th>Статус</th>
            <th>Действия</th>
        `,
        },
      ),
    },
  );

  const tbody = createElement('tbody');
  table.append(tbody);
  tWrap.tbody = tbody;
  tWrap.append(table);
  return tWrap;
};

export const createTitle = (intro, text) => createElement(
  'h3',
  {
    textContent: `${intro}${text}`,
  },
);

export const createFormInput = () => createElement(
  'label',
  {
    className: 'form-group me-3 mb-0',
  },
  {
    append: createElement(
      'input',
      {
        className: 'form-control',
        name: 'task',
        type: 'text',
        placeholder: 'ввести задачу',
      },
    ),
  },
);

export const createForm = () => {
  const form = createElement(
    'form',
    {
      className: 'd-flex align-items-center mb-3',
    },
  );
  return form;
};

export const createBootstrapJs = () => createElement(
  'script',
  {
    src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js',
  },
);

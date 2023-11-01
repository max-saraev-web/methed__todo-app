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

export const createTitle = (intro, text) => createElement(
  'h3',
  {
    textContent: `${intro}${text}`,
  },
);

export const createForm = () => {
  const form = createElement(
    'form',
    {
      className: 'd-flex align-items-center mb-3',
    },
    {
      append: createElement(
        'label',
        {
          className: 'form-group me-3 mb-0',
        },
        {
          append: createElement(
            'input',
            {
              className: 'form-control',
              type: 'text',
              placeholder: 'ввести задачу',
            },
          ),
        },
      ),
      appends: [
        createElement(
          'button',
          {
            type: 'submit',
            className: 'btn btn-primary me-3',
            textContent: 'Сохранить',
          },
        ),
        createElement(
          'button',
          {
            type: 'reset',
            className: 'btn btn-warning',
            textContent: 'Очистить',
          },
        ),
      ],
    },
  );
  return form;
};

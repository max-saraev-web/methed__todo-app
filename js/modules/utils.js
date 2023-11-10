export const generateId = (min = 1, max = 9) => {
  const fullId = [];

  for (let i = 0; i < 8; i++) {
    if (i === 0) {
      fullId[i] = Math.round(Math.random() * (max - min) + min);
    } else fullId.push(Math.round(Math.random() * (max - min) + min));
  }
  return fullId.join('');
};

export const countRows = () => {
  document.querySelectorAll('.table__row').forEach((elem, i) => {
    elem.querySelector('.to-do__counter').textContent = i + 1;
  });
};

export const consciousDel = msg => {
  const delCondition = confirm(msg);
  return delCondition;
};

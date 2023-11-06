export const addController = (form, submitBtn, clearBtn) => {
  form.addEventListener('input', ev => {
    const target = ev.target;

    if (target.value.trim() !== '') {
      submitBtn.removeAttribute('disabled');
    } else if (target.value.trim() === '') {
      submitBtn.setAttribute('disabled', 'true');
    }
  });
  form.addEventListener('click', ev => {
    const target = ev.target;

    if (target === clearBtn) {
      submitBtn.setAttribute('disabled', 'true');
    }
  });
};

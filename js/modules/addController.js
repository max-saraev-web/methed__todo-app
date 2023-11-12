export const addController = (form, submitBtn, clearBtn) => {
  form.addEventListener('input', ev => {
    const target = ev.target;
    if (target.value.trim() !== '') {
      submitBtn.disabled = false;
    } else if (target.value.trim() === '') {
      submitBtn.disabled = true;
    }
  });
  form.addEventListener('click', ev => {
    const target = ev.target;

    if (target === clearBtn) {
      submitBtn.disabled = true;
    }
  });
};

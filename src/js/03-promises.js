import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector("[name='delay']"),
  step: document.querySelector("[name='step']"),
  amount: document.querySelector("[name='amount']"),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

  const formData = {};

  formData.delay = Number(refs.delay.value);
  formData.step = Number(refs.step.value);
  formData.amount = Number(refs.amount.value);

  let delayStep = 0;
  let promise;

  setTimeout(() => {
    for (
      let currentPromisePos = 1;
      currentPromisePos <= formData.amount;
      currentPromisePos++
    ) {
      promise = createPromise(currentPromisePos, delayStep);

      promise
        .then(({ position, delay }) => {
          Notify.success(
            `✅ Fulfilled promise ${position} in ${delay + formData.delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          if (currentPromisePos === 0) delay += formData.delay;
          Notify.failure(
            `❌ Rejected promise ${position} in ${delay + formData.delay}ms`
          );
        });

      delayStep += formData.step;
    }
  }, formData.delay);

  refs.form.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  if (shouldResolve) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ position, delay }), delay);
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject({ position, delay }), delay);
    });
  }
}

import Notiflix from 'notiflix';

const elements = {
  form: document.querySelector('.form'),
};

elements.form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;

  for (let i = 0; i < amount.value; i += 1) {
    const countDelay = Number(delay.value) + Number(step.value) * i;

    createPromise(i + 1, countDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.5;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // console.log('Fulfill');
      } else {
        reject({ position, delay });
        // console.log('Reject');
      }
    }, delay);
  });
  return promise;
}

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function clearForm() {
    document.querySelector('input[name="delay"]').value = '';
    const radios = document.getElementsByName('state');
    for (let i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }
}

document.querySelector(".form").addEventListener('submit', function (event) {
    event.preventDefault();
    const form = event.target;
    const delay = parseInt(form.delay.value);
    const state = form.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
        clearForm();
    })

promise
    .then(delay => {
        iziToast.success({
            title: 'Success',
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: "topRight"
        });
    })
    .catch(delay => {
        iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay}ms`,
            position: "topRight"
        });
    })
});

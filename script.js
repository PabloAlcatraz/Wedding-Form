// Код таймера
const weddingDateValue = new Date("June 13, 2026 15:00:00").getTime();

const timerUpdate = setInterval(function() {
    const now = new Date().getTime();
    const diff = weddingDateValue - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if(document.getElementById("days")) {
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
    }

    if (diff < 0) {
        clearInterval(timerUpdate);
    }
}, 1000);

// Код формы (ждем полной загрузки страницы)
window.addEventListener('load', function() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyhyiVf6veCh9E5BxrL8Ebebr7CUBqFA1051Csqn5g-jTf8Zxoex-795_yT2Z0vZ8u5Hw/exec';
    const form = document.getElementById('wedding-form');

    if (form) {
        form.addEventListener('submit', e => {
      e.preventDefault();

      // --- ДОБАВЛЯЕМ ТУТ ---
      const submitBtn = form.querySelector('.submit-btn');
      submitBtn.disabled = true;
      submitBtn.innerText = 'Отправка...';
      // ---------------------

      // Собираем напитки
      const selectedDrinks = Array.from(form.querySelectorAll('input[name="drink"]:checked'))
        .map(cb => cb.parentNode.textContent.trim())
        .join(', ');

      const formData = new FormData(form);
      formData.append('drinks', selectedDrinks);

      fetch(scriptURL, { method: 'POST', body: formData})
        .then(response => {
          alert('Спасибо! Ваша акета успешно отправлена.');
          form.reset();
          
          // --- ДОБАВЛЯЕМ ТУТ ---
          submitBtn.disabled = false;
          submitBtn.innerText = 'Отправить';
          // ---------------------
        })
        .catch(error => {
          console.error('Ошибка!', error.message);
          alert('Ошибка при отправке.');
          
          // --- И ТУТ ТОЖЕ ---
          submitBtn.disabled = false;
          submitBtn.innerText = 'Отправить';
          // ------------------
        });
    });
    } else {
        console.error("Форма с id='wedding-form' не найдена на странице!");
    }
});
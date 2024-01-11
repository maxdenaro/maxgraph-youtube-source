document.addEventListener('DOMContentLoaded', () => {
  // const date = {
  //   month: new Date().getMonth() + 1,
  //   day: new Date().getDate(),
  //   year: new Date().getFullYear()
  // };

  fetch('getServerDate.php')
    .then(response => response.json())
    .then(date => {
      fetch('actions.json')
      .then(response => response.json())
      .then(data => displayActions(data, date))
      .catch(error => console.error('Ошибка запроса', error));
    })
    .catch(error => console.error('Ошибка запроса', error));

  // fetch('actions.json')
  //   .then(response => response.json())
  //   .then(data => displayActions(data, date))
  //   .catch(error => console.error('Ошибка запроса', error));
});

const displayActions = (actionsData, date) => {
  const actionsContainer = document.querySelector('.actions-container');
  const currentDate = new Date(date.year, date.month - 1, date.day);

  actionsData.forEach(action => {
    const startDate = new Date(action.start_date);
    const endDate = new Date(action.end_date);

    if (currentDate >= startDate && currentDate <= endDate) {
      const actionElement = createAction(action, startDate, endDate);
      actionsContainer.appendChild(actionElement);
    }
  });
};

const createAction = (action, startDate, endDate) => {
  const actionElement = document.createElement('div');
  actionElement.classList.add('action');

  const title = document.createElement('h2');
  title.classList.add('action__title');
  title.textContent = action.title;

  const descr = document.createElement('p');
  descr.classList.add('action__descr');
  descr.textContent = action.conditions;

  const discount = document.createElement('div');
  discount.classList.add('action__discount');
  discount.textContent = `Скидка: ${action.discount}%`;

  const dates = document.createElement('div');
  dates.classList.add('action__dates');
  dates.textContent = `${formatDate(startDate)} - ${formatDate(endDate)}`;

  actionElement.appendChild(title);
  actionElement.appendChild(descr);
  actionElement.appendChild(discount);
  actionElement.appendChild(dates);

  return actionElement;
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: 'numeric',
    month: 'long'
  };

  return date.toLocaleString('ru-RU', options);
};

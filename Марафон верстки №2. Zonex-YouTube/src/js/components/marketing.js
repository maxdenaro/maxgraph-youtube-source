import vars from '../_vars';

if (vars.$marketing) {
  let counter = 0;
  let delay = 4000;

  const data = [{
      title: 'Title of product 1',
      where: 'Moscow, Russia'
    },
    {
      title: 'Title of product 2',
      where: 'Kiev, Ukraine'
    },
    {
      title: 'Title of product 3',
      where: 'Rome, Italy'
    },
  ];

  const closeMarketing = () => {
    vars.$marketing.classList.remove('marketing--visible');
  }

  const changeMarketingData = () => {
    vars.$marketing.classList.remove('marketing--visible');

    setTimeout(() => {
      vars.$marketing.classList.add('marketing--visible');
    }, delay - 2000);

    const stringTitle = `${data[counter].title}`;
    const stringWhere = `15 minutes ago ${data[counter].where}`;

    vars.$marketing.querySelector('.marketing__title').textContent = stringTitle;
    vars.$marketing.querySelector('.marketing__when-from').textContent = stringWhere;

    counter++;

    if (counter === data.length) {
      counter = 0;
    }
  }

  changeMarketingData();

  setInterval(changeMarketingData, delay);

  vars.$marketing.addEventListener('click', (e) => {
    if (e.target.classList.contains('marketing__close')) {
      closeMarketing();
    }
  });
}


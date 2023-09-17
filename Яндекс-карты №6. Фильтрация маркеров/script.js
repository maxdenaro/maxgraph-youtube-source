const categoriesData = {
  category1: [{
      lat: 55.75222,
      lon: 37.61556,
      name: 'Метка 1 - Категория 1',
    },
    {
      lat: 55.75159,
      lon: 37.61688,
      name: 'Метка 2 - Категория 1'
    },
  ],
  category2: [{
      lat: 55.75583,
      lon: 37.61778,
      name: 'Метка 1 - Категория 2'
    },
    {
      lat: 55.75651,
      lon: 37.61622,
      name: 'Метка 2 - Категория 2'
    },
  ],
  category3: [{
      lat: 55.75444,
      lon: 37.61833,
      name: 'Метка 1 - Категория 3'
    },
    {
      lat: 55.75333,
      lon: 37.61722,
      name: 'Метка 2 - Категория 3'
    },
  ],
};

const init = () => {
  const map = new ymaps.Map('mapContainer', {
    center: [55.753215, 37.622504],
    zoom: 14,
  });

  let activeCategory = "category1";

  const showCategory = (category) => {
    map.geoObjects.removeAll();

    categoriesData[category].forEach((item) => {
      const placemark = new ymaps.Placemark([item.lat, item.lon], {
        hintContent: item.name,
        balloonContent: item.name,
      });
      
      map.geoObjects.add(placemark);
    });

    activeCategory = category;
  }

  const categoryButtons = document.querySelectorAll('.category-button');
  categoryButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.category;
      showCategory(category);
    });
  });

  showCategory(activeCategory);
};

ymaps.ready(init);
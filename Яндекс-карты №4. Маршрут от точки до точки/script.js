ymaps.ready(function () {

  let myMap = new ymaps.Map('map-test', {
    center: [59.91795236804815,30.304908500000003],
    zoom: 15,
    controls: ['routePanelControl']
  });

  let control = myMap.controls.get('routePanelControl');
  let city = 'Санкт-Петербург';

  control.routePanel.state.set({
    type: 'masstransit',
    fromEnabled: false,
    from: `${city}, проспект Энергетиков 9`,
    toEnabled: true,
    to: `${city}, Невский проспект 146`,
  });

  control.routePanel.options.set({
    types: {
      masstransit: true,
      pedestrian: true,
      taxi: true
    }
  })
  
});
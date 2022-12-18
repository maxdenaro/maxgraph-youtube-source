ymaps.ready(function () {

  let myMap = new ymaps.Map('map-test', {
    center: [59.91795236804815, 30.304908500000003],
    zoom: 15,
    controls: ['routePanelControl']
  });

  let control = myMap.controls.get('routePanelControl');
  let city = 'Санкт-Петербург';

  // let location = ymaps.geolocation.get();

  // location.then(function(res) {
  // 	let locationText = res.geoObjects.get(0).properties.get('text');
  // 	console.log(locationText)
  // });

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    const crd = pos.coords;

    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);


    let reverseGeocoder = ymaps.geocode([crd.latitude, crd.longitude]);
    let locationText = null;
    reverseGeocoder.then(function (res) {
      locationText = res.geoObjects.get(0).properties.get('text')
      console.log(locationText)

      control.routePanel.state.set({
        type: 'masstransit',
        fromEnabled: false,
        from: locationText,
        toEnabled: true,
        to: `${city}, Невский проспект 146`,
      });
    });

    console.log(locationText)

    

    control.routePanel.options.set({
      types: {
        masstransit: true,
        pedestrian: true,
        taxi: true
      }
    })
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);



});
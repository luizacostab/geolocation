let mode = 'map';

var onSuccess = function(position) {
  alert('Latitude: '          + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' );
  L.mapquest.key = 'lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24';
  var baseLayer = L.mapquest.tileLayer('dark');

  var map = L.mapquest.map('map', {
    center: [position.coords.latitude, position.coords.longitude],
    layers: baseLayer,
    zoom: 16,
  });

  L.marker([position.coords.latitude, position.coords.longitude], {
    icon: L.mapquest.icons.marker(),
    draggable: false
  }).bindPopup('Meu local').addTo(map);

  L.control.layers({
    'Map': baseLayer
  }).addTo(map);

  var drawnItems = L.featureGroup().addTo(map);

  map.addControl(new L.Control.Draw({
    edit: {
      featureGroup: drawnItems,
      poly: {
        allowIntersection: false
      }
    },
    draw: {
      polygon: {
        allowIntersection: false,
        showArea: true
      }
    }
  }));

  map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;

    drawnItems.addLayer(layer);
  })
};
function onError(error) {
    navigator.notification.alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
window.onload = function () {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 45.3032, lng: -73.3315 },
    zoom: 8,
  });

  
  map.addListener('click', function(event){
    new google.maps.Marker({
      position : event.latLng,
      map: map
  });
    

});

}
initMap();

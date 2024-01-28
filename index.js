let map;
let marker;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
    center: { lat: 45.3032, lng: -73.3315 },
    zoom: 8,
  });

  let infoWindow = new google.maps.InfoWindow({
    content: '<h1>City<h1/>'
  });  

  map.addListener('click', function(event) 
    {
      if (marker){
        marker.setPosition(event.latLng);

      } else { 
        marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        icon: {
          url : './icon/news_icon.png',
          scaledSize : new google.maps.Size(50, 50)
        }
      }) 
    }
  });

}

initMap();

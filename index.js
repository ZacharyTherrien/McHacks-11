let map;
let marker;

async function initMap()
{
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
    center: { lat: 45.3032, lng: -73.3315 },
    zoom: 8,
    geocoder = new google.maps.Geocoder()
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

        geocoder.geocode({
          'latLng' : event.latLng
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              alert(results[0].formatted_address);
            }
          }
      }
    )
  }

}

initMap();

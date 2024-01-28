let map;
let marker;

async function initMap()
{
    const { Map } = await google.maps.importLibrary("maps");

    let geocoder = new google.maps.Geocoder();
    map = new Map(document.getElementById("map"), {
    center: { lat: 45.3032, lng: -73.3315 },
    zoom: 8,
    });

    map.addListener('click', function(event) 
    {

        if (marker)
            marker.setPosition(event.latLng);

        else
        { 
            marker = new google.maps.Marker(
            {
                position: event.latLng,
                map: map,
                icon: {
                    url : './icon/news_icon.png',
                    scaledSize : new google.maps.Size(50, 50)
                }
            })
          }

            geocoder.geocode(
            {
                'latLng' : event.latLng
            }, (results, status) =>
            {
                if (status == google.maps.GeocoderStatus.OK || results[0])
                {
                    let country_long;
                    let country_small;
                    let address = results[0].address_components
                    for (let i = 0; i < address.length; i++)
                    {
                        let component = address[i];
                        for (let j = 0; j < component.types.length; j++)
                        {
                            let type = component.types[j];
                            if (type == "country")
                            {
                                console.log(component);
                                country_long = component.long_name;
                                country_small = component.short_name;
                            }
                        }
                    }
                    alert("Broadcasting from " + country_long + " (" + country_small + ")")
                }
            })
    })
}

initMap();

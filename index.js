import { COUNTRY_LONG, COUNTRY_SMALL, change_country, url, API_KEY, query, change_url } from "./static.js"

let map;
let marker;

async function initMap()
{
    const { Map } = await google.maps.importLibrary("maps");

    let geocoder = new google.maps.Geocoder();
    map = new Map(document.getElementById("map"), {
        center: { lat: 45.3032, lng: -73.3315 },
        zoom: 8,
        fullscreenControl: true
    });

    map.addListener('click', event =>
    {
        if (marker)
            marker.setPosition(event.latLng);

        else
        {
            reset();
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
                    let address = results[0].address_components;
                    //console.log(address);
                    for (let i = 0; i < address.length; i++)
                    {
                        let component = address[i];
                        for (let j = 0; j < component.types.length; j++)
                        {
                            let type = component.types[j];
                            if (type == "country")
                                change_country(component.long_name, component.short_name)
                        }
                    }
                    document.getElementById("searchResults").innerText = "Search results for: "
                    if (COUNTRY_LONG == "")
                    {
                        console.log("Oops! Please click on a valid country. ");
                    }
                    else
                    {
                        console.log("Broadcasting from " + COUNTRY_LONG + " (" + COUNTRY_SMALL + ")");
                        change_url(COUNTRY_LONG);
                    }
                }
            })
    })
}

initMap();

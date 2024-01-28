import { COUNTRY_LONG, COUNTRY_SMALL, reset, change_country, url, API_KEY, query, change_url } from "./static.js"

let map;
let marker;
let geocoder;

document.getElementById("randomizerButton").addEventListener("click", randoArea);

async function initMap()
{
    const { Map } = await google.maps.importLibrary("maps");

    geocoder = new google.maps.Geocoder();
    map = new Map(document.getElementById("map"), {
        center: { lat: 45.3032, lng: -73.3315 },
        zoom: 8,
        fullscreenControl: true
    });

    map.addListener('click', event => {
        mapClick(event.latLng, geocoder);
    })
}

function mapClick(latLng, geocoder = null){
    let list = document.getElementById("results");
    list.innerHTML = "";
    if (marker){
        marker.setPosition(latLng);
    }
    else{
        reset();
        marker = new google.maps.Marker(
        {
            position: latLng,
            map: map,
            icon: {
                url : './icon/news_icon.png',
                scaledSize : new google.maps.Size(50, 75)
            }
        })
    }

    geocoder.geocode(
    {
        'latLng' : latLng
    }, (results, status) =>
    {
        if (status == google.maps.GeocoderStatus.OK || results[0])
        {
            //By default, set it to invalid the first time, and only once.
            //console.log("Invalid country clicked. ");
            document.getElementById('findMe').disabled = true;
            let found = false;
            //Loop through each result from the onClick on the map.
            for(let k = 0; k < results.length; k++)
            {
                let address = results[k].address_components;
                //console.log(address);
                //Each result provides up to several different types of addresses for a location.
                for (let i = 0; i < address.length; i++)
                {
                    let component = address[i];
                    //Loop through each component of each different address until country name.
                    for (let j = 0; j < component.types.length; j++)
                    {
                        let type = component.types[j];
                        if (type == "country")
                        {
                            change_country(component.long_name, component.short_name);
                            found = true;
                            //alert();
                            //Now break through each loop since country name found.
                            break;
                        }
                    }
                    if(found)
                        break;
                }
                document.getElementById("searchResults").innerText = "Search results for: "
                if(found){
                    console.log("Broadcasting from " + COUNTRY_LONG + " (" + COUNTRY_SMALL + ")");
                    change_url(COUNTRY_LONG);
                    document.getElementById("searchResults").innerHTML += COUNTRY_LONG;
                    document.getElementById('findMe').disabled = false;
                    break;
                }
                // else{
                //     let list = document.getElementById("results");
                //     let fish = document.createElement("img");
                //     fish.classList.add('articleImage');
                //     fish.src = "./icon/aquarium.gif";
                //     list.appendChild(fish);
                // }
            }
            if(!found){
                let fish = document.createElement("img");
                fish.classList.add('articleImage');
                fish.src = "./icon/aquarium.gif";
                list.appendChild(fish);
            }
        }
    })
}

initMap();

function randoArea(){
    let newlatLng;
    let newLat =  ((Math.random() * 180) -90);
    let newLng = ((Math.random() * 360) -180);
    console.log(newLat + " " + newLng);
    newlatLng = {lat: newLat, lng: newLng};
    mapClick(newlatLng, geocoder);
}
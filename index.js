import { COUNTRY_LONG, COUNTRY_SMALL, reset, change_country, change_url, enableArticleButton, enableSwitchingArticles} from "./static.js"

let map;
let marker;
let geocoder;

document.getElementById("randomizerButton").addEventListener("click", randoArea);
document.getElementById("title").addEventListener("click", logoClick);

async function initMap(){
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
        marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: {
                url : './icon/news_icon.png',
                scaledSize : new google.maps.Size(50, 75)
            }
        })
    }

    geocoder.geocode({
        'latLng' : latLng
    }, (results, status) => {
        document.getElementById('findMe').disabled = true;
        enableSwitchingArticles(false);
        document.getElementById("searchResults").innerText = "Search results for: "
        if (status == google.maps.GeocoderStatus.OK || results[0]){
            if(results.length > 1){
                let component = results[results.length - 1]['formatted_address'];
                change_country(component, "");
                console.log("Broadcasting from " + COUNTRY_LONG + " (" + COUNTRY_SMALL + ")");
                change_url(COUNTRY_LONG);
                document.getElementById("searchResults").innerHTML += COUNTRY_LONG;
                enableArticleButton(true);
            }
            else{
                let fish = document.createElement("img");
                fish.classList.add('articleImage');
                fish.src = "./icon/aquarium.gif";
                list.appendChild(fish);
                enableArticleButton(false);
            }
        }
        else{
            console.error("No results found, possible error from fetching map data.");
        }
    })
}

function randoArea(){
    let newlatLng;
    let newLat =  ((Math.random() * 180) -90);
    let newLng = ((Math.random() * 360) -180);
    console.log(newLat + " " + newLng);
    newlatLng = {lat: newLat, lng: newLng};
    mapClick(newlatLng, geocoder);
}

function logoClick(){
    let hour = new Date().getHours();
    if(hour == 3){
        let list = document.getElementById("results");
        list.innerHTML = "";
        let potion = document.createElement("img");
        potion.classList.add("articleImage");
        potion.src = "./icon/Potion.gif";
        list.appendChild(potion);
        alert("...");    
    }
    else{
        alert("\tWelcome to Hello World News!" +
        "\nFeel free to browse the map for all the news across the world!" +
        "\nGlobal news is just a click away! Find a country on the map, and press the button for its local news!");
    }
}

enableSwitchingArticles(false);
initMap();
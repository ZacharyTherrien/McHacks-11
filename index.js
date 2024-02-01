import { reset, change_url, enableArticleButton, enableSwitchingArticles, toggleCountryQuery} from "./static.js"

let map;
let marker;
let geocoder;

let list = document.getElementById("results");
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
        mapClick(event.latLng);
    })
}

function setMarker(latLng){
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
}

function mapClick(latLng){
    list.innerHTML = "";
    setMarker(latLng);
    enableArticleButton(false);
    enableSwitchingArticles(false);
    document.getElementById("searchResults").innerText = "Search results for: "
    geocoder.geocode({
        'latLng' : latLng
    }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK || results[0]){
            if(results.length > 1){
                let component = results[results.length - 1];
                let country_long = component.address_components[0].long_name; 
                let country_short = component.address_components[0].short_name;
                setCountry(country_long, country_short);
            }
            else{
                setOcean();
            }
        }
        else{
            console.error("No results found, possible error from fetching map data.");
        }
    });
}

function setCountry(country_long, country_short = ""){
    change_url(country_long, country_short);
    enableArticleButton(true);
    document.getElementById("searchResults").innerHTML += country_long;
    console.log("Broadcasting from " + country_long + " (" + country_short + ")");
}

function setOcean(){
    let fish = document.createElement("img");
    fish.classList.add('articleImage');
    fish.src = "./icon/aquarium.gif";
    list.appendChild(fish);
}

function randoArea(){
    list.innerHTML = "";
    let loading = document.createElement("p");
    loading.setAttribute("id", "loading");
    loading.innerHTML = "Random country incoming...";
    list.appendChild(loading);
    document.getElementById("searchResults").innerText = "Search results for: ";
    enableSwitchingArticles(false);
    getRandomArea();
}

function getRandomArea(){
    let newLatLng;
    let newLat =  ((Math.random() * 180) -90);
    let newLng = ((Math.random() * 360) -180);
    newLatLng = {lat: newLat, lng: newLng};
    console.log("Random Coordinates: " + newLat + " " + newLng);geocoder.geocode({
        'latLng' : newLatLng
    }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK || results[0]){
            if(results.length > 1){
                let component = results[results.length - 1];
                let country_long = component.address_components[0].long_name; 
                let country_short = component.address_components[0].short_name;
                setCountry(country_long, country_short);
                setMarker(newLatLng);
                document.getElementById("loading").innerHTML = "";
            }
            else{
                getRandomArea();
            }
        }
    });
}

function logoClick(){
    let toggleNotification = toggleCountryQuery() ? "\nToggle to search by articles published in selected country is on! Prepare to translate!" : "\nThe toggle has been turned off";
    let hour = new Date().getHours();
    list.innerHTML = "";
    if(hour == 3){
        let potion = document.createElement("img");
        potion.classList.add("articleImage");
        potion.src = "./icon/Potion.gif";
        list.appendChild(potion);
        alert("...");    
    }
    else{
        change_url();
        alert("\tWelcome to Hello World News!" +
        "\nFeel free to browse the map for all the news across the world!" +
        "\nGlobal news is just a click away! Find a country on the map, and press the button for its local news!" +
        toggleNotification);
    }
}

enableSwitchingArticles(false);
enableArticleButton(false);
initMap();
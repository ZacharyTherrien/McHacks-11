export let COUNTRY_LONG = "Canada";
export let COUNTRY_SMALL = "CA";
export const url = "https://gnews.io/api/v4/search?";
export const API_KEY = "&apikey=87752405435ed2dd3fef1c0267ae5da2";
export let query = url + "Canada" + API_KEY;
let toggle = false;

// export function change_country(long, short)
// {
//     COUNTRY_LONG = long;
//     COUNTRY_SMALL = short;
// }

export function reset()
{
    COUNTRY_LONG = "";
    COUNTRY_SMALL = "";
}

export function toggleCountryQuery(){
    toggle = !toggle;
}

export function change_url(country_long, country_short){
    let spaces = country_long.split(" ");
    let newCountry_Long = spaces[0];
    let country = "";
    if(toggle)
        country = `&country=${country_short.toLowerCase()}`;
    for(let i = 1; i < spaces.length; i++){
        newCountry_Long += "+" + spaces[i];
    }
    query = url + `q=${newCountry_Long}` + country + API_KEY;
    console.log(query);
}

export function enableArticleButton(enabled){
    let findButton = document.getElementById("findMe");
    if(enabled){
        findButton.style.pointerEvents = "auto";
        findButton.style.color = "white";
        findButton.style.backgroundColor = "#FFA12B";
    }
    else{
       findButton.style.pointerEvents = "none";
       findButton.style.color = "#FBFBFB";
       findButton.style.backgroundColor = "#E69229";
    }
}

export function enableSwitchingArticles(enabled){
    let changeButtons = document.getElementsByClassName("arrow");
    for(let i = 0; i < changeButtons.length; i++){
        if(enabled){
            changeButtons[i].style.pointerEvents = "auto";
            changeButtons[i].style.backgroundColor = "#FAF9F8";
        }
        else{
            changeButtons[i].style.pointerEvents = "none";
            changeButtons[i].style.backgroundColor = "#DEDEDE";
        }
    }
}
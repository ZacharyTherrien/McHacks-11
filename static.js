export let COUNTRY_LONG = "Canada";
export let COUNTRY_SMALL = "CA";
export const url = "https://gnews.io/api/v4/search?";
export const API_KEY = "&sortby=publishedAt&apikey=87752405435ed2dd3fef1c0267ae5da2";
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
    return toggle;
}

export function change_url(country_long = COUNTRY_LONG, country_short = COUNTRY_SMALL){
    if(country_long)
        COUNTRY_LONG = country_long;
    if(country_short)
        COUNTRY_SMALL = country_short;
    let spaceSplit = COUNTRY_LONG.split(" ");
    let newCountry_Long = spaceSplit[0];
    let countryAbbrv = "";
    if(toggle)
        countryAbbrv = `&country=${COUNTRY_SMALL.toLowerCase()}`;
    for(let i = 1; i < spaceSplit.length; i++){
        newCountry_Long += "+" + spaceSplit[i];
    }
    query = url + `q=${newCountry_Long}` + countryAbbrv + API_KEY;
    console.log(query);
}

export function enableArticleButton(enabled){
    let findButton = document.getElementById("findMe");
    let container = findButton.parentElement;
    if(enabled){
        findButton.style.pointerEvents = "auto";
        findButton.style.color = "white";
        findButton.style.backgroundColor = "#FFA12B";
        container.style.cursor = "pointer";
    }
    else{
        findButton.style.pointerEvents = "none";
        findButton.style.color = "#FBFBFB";
        findButton.style.backgroundColor = "#E69229";
        container.style.cursor = "default";
    }
}

export function enableSwitchingArticles(enabled){
    let changeButtons = document.getElementsByClassName("arrow");
    for(let i = 0; i < changeButtons.length; i++){
        if(enabled){
            changeButtons[i].style.pointerEvents = "auto";
            changeButtons[i].style.backgroundColor = "#FAF9F8";
            changeButtons[i].parentElement.style.cursor = "pointer";
        }
        else{
            changeButtons[i].style.pointerEvents = "none";
            changeButtons[i].style.backgroundColor = "#EEEEEE";
            changeButtons[i].parentElement.style.cursor = "default";
        }
    }
}
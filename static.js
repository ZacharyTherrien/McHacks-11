export let COUNTRY_LONG = "Canada";
export let COUNTRY_SMALL = "CA";
export const url = "https://gnews.io/api/v4/search?q=";
export const API_KEY = "&apikey=87752405435ed2dd3fef1c0267ae5da2";
export let query = url + "Canada" + API_KEY;

export function change_country(long, short)
{
    COUNTRY_LONG = long;
    COUNTRY_SMALL = short;
}

export function change_url(country){
    query = url + country + API_KEY;
}
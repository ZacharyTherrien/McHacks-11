export let COUNTRY_LONG = "Canada";
export let COUNTRY_SMALL = "CA";

export function change_country(long, short)
{
    COUNTRY_LONG = long;
    COUNTRY_SMALL = short;
}

export function reset()
{
    COUNTRY_LONG = "";
    COUNTRY_SMALL = "";
}
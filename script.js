let url = "https://gnews.io/api/v4/search?q=";
let country = "";
const API_KEY = "&apikey=87752405435ed2dd3fef1c0267ae5da2";


country = "Canada"

let query = url + country + API_KEY;

fetch(query)
    .then(function (response) {
        // alert("oh no");
        // console.log(response);
        return response.json;
    })
    .then(function (data) {
        let articles = data.articles;

        for (i = 0; i < articles.length; i++) {
            console.log(articles[i]);
        }
    });
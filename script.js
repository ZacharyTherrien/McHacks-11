import { COUNTRY_LONG, COUNTRY_SMALL } from "./static.js"

const url = "https://gnews.io/api/v4/search?q=";
const API_KEY = "&apikey=87752405435ed2dd3fef1c0267ae5da2";

let query = url + COUNTRY_LONG + API_KEY;

let list = document.getElementById("results");
document.getElementById("findMe").addEventListener("click", articleSearch);

let articles = [];

function articleSearch(){
    fetch(query)
        .then(function (response) {
            // alert("oh no");
            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            articles = data.articles;
            //console.log(articles);
            //console.log(articles);
            
            //Populate the list
            for (let i = 0; i < articles.length; i++) {
                //console.log(articles[i]);
                let article = document.createElement("li");
                article.innerHTML = articles[i]['title'];
                list.appendChild(article);
                validateArticles();
            }
        })
        .catch(function(){
            console.error("oooppss");
            alert();
        });
}

function validateArticles(){
    //let delete;
    let del = [];
    for (let i = 0; i < articles.length; i++){
        for ( let j = i; j < articles.length; j++){
            if (articles[i] = articles[j]){
                del.push(i)
            }
        }
    }
}
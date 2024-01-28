import { COUNTRY_LONG, COUNTRY_SMALL, change_country, url, API_KEY, query } from "./static.js"

// export const url = "https://gnews.io/api/v4/search?q=";
// export const API_KEY = "&apikey=87752405435ed2dd3fef1c0267ae5da2";

let list = document.getElementById("results");
document.getElementById("findMe").addEventListener("click", articleSearch);

let articles = [];

function articleSearch()
{
    list.innerHTML = "";
    let loading = document.createElement("p");
    loading.innerHTML = "Loading articles...";
    list.appendChild(loading)
    let query = url + COUNTRY_LONG + API_KEY;
    fetch(query)
        .then(response => response.json())
        .then(data =>
        {
            list.innerHTML = "";
            articles = data.articles;
            //Populate the list
            for (let i = 0; i < articles.length; i++)
            {
                if (i > 0 && articles[i]['title'] != articles[i - 1]['title'])
                {
                    let article = document.createElement("a");
                    article.classList.add("articles");
                    article.innerHTML = articles[i]['title'];
                    article.href = articles[i]['url'];
                    console.log(articles[i]['url']);
                    let source = document.createElement("span");
                    source.innerHTML = articles[i]['source'];
                    let description = document.createElement("div");
                    description.classList.add("descriptions");
                    description.innerHTML = articles[i]['description'];
                    //Remove the time from the date
                    let date = document.createElement("div");
                    date.classList.add("dates");
                    let parse = articles[i]['publishedAt'].split("T");
                    let time = parse[1];

                    console.log(parse[1])
                    date.innerHTML = "Day: " + parse[0] + " Time: " + parse[1].substring(0, parse[1].length - 1);
                    //
                    let section = document.createElement("li");
                    section.classList.add("sections");
                    section.appendChild(date);
                    section.appendChild(article);
                    section.appendChild(description);
                    list.appendChild(section);
                }
            }
            let foo = document.getElementById("searchResults");
            foo.href = "google.com";
        })
        .catch(() =>
        {
            console.error("oooppss");
            alert();
        });
}

// function validateArticles(){
//     //let delete;
//     let del = [];
//     for (let i = 0; i < articles.length; i++){
//         for ( let j = i; j < articles.length; j++){
//             if (articles[i]['title'] == articles[j]['title']){
//                 del.push(articles[i])
//                 break
//             }
//         }
//     }

//     for (let k = 0; k < del.length; k++){
//         articles.splice(del[k], 1)
//     }
// }
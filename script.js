import { query, enableSwitchingArticles } from "./static.js"

var counter = 0;
var allArticles = [];

let list = document.getElementById("results");
document.getElementById("findMe").addEventListener("click", articleSearch);

function goToNextArticle()
{
    counter++;
    if (counter == allArticles.length)
        counter = 0;
    list.innerHTML = "";
    console.log(counter);
    list.appendChild(allArticles[counter]);
}
document.getElementById("nextButtonButton").onclick = goToNextArticle;

function goToPreviousArticle()
{
    if (counter == 0)
        counter = allArticles.length;
    counter--;
    list.innerHTML = "";
    console.log(counter);
    list.appendChild(allArticles[counter]);
}
document.getElementById("previousButtonButton").onclick = goToPreviousArticle;

function articleSearch()
{
    allArticles = [];
    list.innerHTML = "";
    let loading = document.createElement("p");
    loading.innerHTML = "Loading articles...";
    list.appendChild(loading);
    fetch(query)
        .then(response => response.json())
        .then(data =>
        {
            list.innerHTML = "";
            let articles = data.articles;
            //Populate the list
            for (let i = 0; i < articles.length; i++)
            {
                console.log(articles[i]);
                if (i > 0 && articles[i]['title'] != articles[i - 1]['title'])
                {
                    let article = document.createElement("a");
                    article.classList.add("articles");
                    article.innerHTML = articles[i]['title'];
                    article.href = articles[i]['url'];
                    article.target = "_blank";
                    let source = document.createElement("span");
                    source.innerHTML = articles[i]['source'];
                    let description = document.createElement("div");
                    description.classList.add("descriptions");
                    description.innerHTML = articles[i]['description'];
                    //Append the time to the date
                    let date = document.createElement("div");
                    date.classList.add("dates");
                    let parse = articles[i]['publishedAt'].split("T");
                    date.innerHTML = parse[0] + " at: " + parse[1].slice(0, parse[1].length - 1);
                    let articleImage = document.createElement("img");
                    articleImage.src = articles[i]['image'];
                    articleImage.classList.add('articleImage');
                    let section = document.createElement("li");
                    section.classList.add("sections");
                    section.appendChild(date);
                    section.appendChild(article);
                    section.appendChild(document.createElement("br"));
                    section.appendChild(description);
                    section.appendChild(articleImage);
                    allArticles.push(section);
                }
            }
            list.appendChild(allArticles[0]);
            enableSwitchingArticles(true);
            // let foo = document.getElementById("searchResults");
            // foo.href = "google.com";
        })
        .catch(() =>
        {
            console.error("oooppss");
            alert("\tError fetching articles." +
            "\nThe API for fetching the articles might made too many requests recently, try again tomorrow.");
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
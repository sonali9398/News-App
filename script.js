const API_KEY = "8c32181027cb42b89a380819d91e90f5";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));


function reload(){
    window.location.reload();
}

async function fetchNews(query) {
   const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await response.json();
//    console.log(data.articles)
   bindData(data.articles)
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemp = document.getElementById("template-news-card");

    cardsContainer.innerHTML = " ";

    articles.forEach((article) =>{
        if(!article.urlToImage) return;
        const cardClone = newsCardTemp.content.cloneNode(true);
        fillDataInCard(cardClone, article); 
        cardsContainer.appendChild(cardClone)
    })
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-Us", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click", () =>{
        window.open(article.url, "_blank");
    })
}

let currentSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id)
    const navItems = document.getElementById(id);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = navItems;
    currentSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('searchText');

searchButton.addEventListener('click', () =>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = null;
})


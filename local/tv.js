import jsonConfig from 'https://t-yauk.github.io/peak-theatre/tv/the-library.json' with {type: "json"};

const container = (document.getElementsByClassName("library-wrapper"))[0];
const episodeContainer = (document.getElementsByClassName("episode-container"))[0];
const episodeWrapper = (document.getElementsByClassName("episode-wrapper"))[0];
const seasonContainer = (document.getElementsByClassName("season-wrapper"))[0];
const details = (document.getElementsByClassName("details"))[0];
const returnHome = document.getElementById("homelink");
const showContainer = (document.getElementsByClassName("show-wrapper"))[0];
const showDetails = (document.getElementsByClassName("show-details"))[0];
const returnButton = document.querySelector(".main-menu-item.return");
const loading = (document.getElementsByClassName("loading"))[0];

const data = jsonConfig.shows;
let library = [];
let episodes;
let allEpisodes;
let id = 6;
let seasons = [];
let i;

const wrapper = document.querySelector('.episodes');

window.onload = function() {

    getData();

}

async function getData() {

    for(let i=0;i<data.length;i++){
        const requestURL = data[i].url;
        const request = new Request(requestURL);
        const response = await fetch(request);
        const rawJSON = await response.json();
        library.push(rawJSON);
    }

    populate();

}

async function populate() {

    for(i=0;i<library.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add("library-item");
        newItem.id = i;
        newItem.innerHTML = `<div class="overlay"></div><img src="../elements/tv/thumbnails/${data[i].image}">`;
        container.appendChild(newItem);
    }

    const items = document.querySelectorAll('.library-item');
	items.forEach(element => {
		element.addEventListener('click', function(event) {
            id = Number(this.id);
            container.classList.remove("active");
            episodeContainer.innerHTML = "";
			populateShow();
  		});
	});

}



function populateShow() {

    document.getElementById("show-thumbnail").src = `../elements/tv/thumbnails/${data[id].image}`;
    document.getElementById("show-logo").src = `../elements/tv/logos/${library[id].logo}`;
    document.getElementById("description").innerHTML = library[id].description;

    showContainer.classList.add("active");
    returnButton.style.display = "block";

    const offset = showDetails.offsetHeight + 25;

    episodeWrapper.style.height = `calc(90vh - ${offset}px)`;

    allEpisodes = library[id].episodes;

    episodes = library[id].episodes;

    findSeasons();

}

async function findSeasons() {

    for(i=0;i<allEpisodes.length;i++){
        if (!seasons.includes(allEpisodes[i].season)) {
            seasons.push(allEpisodes[i].season);
        }
    }

    if(seasons.length > 1){
        await populateSeasons();
    }

    populateEpisodes();

}

function populateSeasons() {

    for(i=0;i<seasons.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add("season-item");
        if(seasons.length > 6){
            newItem.style.fontSize = "1.3rem";
        }
        newItem.innerHTML = `Season ${seasons[i]}`;
        seasonContainer.appendChild(newItem);
    }

    const items = document.querySelectorAll('.season-item');
	items.forEach(element => {
		element.addEventListener('click', function(event) {
            for(let s=0;s<items.length;s++){
                items[s].classList.remove("active");
            }
            this.classList.add("active");
            let season = this.innerHTML;
            season = season.replace("Season ", "");
            episodeContainer.innerHTML = "";
            episodes = [];
            for(i=0;i<allEpisodes.length;i++){
                if(allEpisodes[i].season == season){
                    episodes.push(allEpisodes[i]);
                }
            }
            episodeWrapper.scrollTo(0,0);
            populateEpisodes();
  		});
	});

}

function populateEpisodes() {

    for(i=0;i<episodes.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add("episode-item");
        newItem.id = i;
        newItem.innerHTML = `<div class="top" style="background-image:url('${episodes[i].thumbnail}')"><div class="overlay"></div><span class="title">${episodes[i].episode_number}. ${episodes[i].title}</span></div><p class="description">${episodes[i].description}</p>`;
        episodeContainer.appendChild(newItem);
    };

    const element = (document.getElementsByClassName("episode-item"))[0];
    const elementWidth = element.offsetWidth + 30;
    
    episodeContainer.style.width = `${elementWidth * episodes.length}px`;

    const items = document.querySelectorAll('.episode-item');
	items.forEach(element => {
		element.addEventListener('click', function(event) {
            let epID = Number(this.id);
            for(i=0;i<allEpisodes.length;i++){
                if(allEpisodes[i].title == episodes[epID].title){
                    epID = i;
                    const url = `/tv/watch?s=${id}&e=${epID}`;
                    loading.classList.add("active");
                    window.location.href = url;
                }
            }
  		});
	});

}

returnButton.addEventListener("click", (event) => {
    episodeWrapper.scrollTo(0, 0);
    container.classList.add("active");
    showContainer.classList.remove("active");
    returnButton.style.display = "none";
    seasonContainer.innerHTML = "";
    seasons = [];
});

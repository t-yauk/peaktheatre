import jsonConfig from 'https://t-yauk.github.io/peak-theatre/tv/the-library.json' with {type: "json"};

const container = (document.getElementsByClassName("library"))[0];
const episodeContainer = (document.getElementsByClassName("library"))[1];
const seasonContainer = (document.getElementsByClassName("season-wrapper"))[0];
const details = (document.getElementsByClassName("details"))[0];
const returnHome = document.getElementById("homelink");

const data = jsonConfig.shows;
let library = [];
let episodes;
let id;
let seasons = [];
let season;

const wrapper = document.querySelector('.episodes');
const originalTop = episodeContainer.scrollTop;
const originalLeft = episodeContainer.scrollLeft;

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

    for(let i=0;i<library.length;i++){
        const newItem = document.createElement('div');
        newItem.classList.add("library-item");
        newItem.id = i;
        newItem.innerHTML = `<div class="overlay"></div><img src="../elements/tv/thumbnails/${data[i].image}">`;
        container.appendChild(newItem);
    }

    const initalElement = (document.getElementsByClassName("library-item"))[0];
    const offsetWidth = initalElement.offsetWidth;

    const width = (((offsetWidth + 50) * library.length) + 50);

    container.style.width = `${width}px`;

    const items = document.querySelectorAll('.library-item');
	items.forEach(element => {
		element.addEventListener('click', function(event) {
            id = Number(this.id);
			populateDetails();
  		});
	});

}



function populateDetails() {

    document.getElementById("artwork").src = `../elements/tv/artwork/${library[id].image_url}`;
    document.getElementById("logo").src = `../elements/tv/logos/${library[id].logo}`;
    document.getElementById("description").innerHTML = library[id].description;

    episodes = library[id].episodes;

    populateEpisodes();

    details.classList.add("active");

    populateSeasons();

}

function populateEpisodes() {
    for(let i=0;i<episodes.length;i++){

        let description;

        if((episodes[i].description).length > 370){
            description = (episodes[i].description).slice(0, 370);
            description += "...";
        }else{
            description = episodes[i].description;
        }

        const newItem = document.createElement('div');
        newItem.classList.add("episode-item");

        for(let e=0;e<(library[id].episodes).length;e++){
            if(episodes[i].title == library[id].episodes[e].title){
                newItem.id = e;
                break;
            }
        }
        
        newItem.innerHTML = `<img src="${episodes[i].thumbnail}"><div class="episode-details"><span class="title">${episodes[i].episode_number}. ${episodes[i].title}</span><p class="description">${description}</p></div>`;
        episodeContainer.appendChild(newItem);
    }

    const width = ((550 * episodes.length) + 50);

    episodeContainer.style.width = `${width}px`;

    const items = document.querySelectorAll('.episode-item');
	items.forEach(element => {
		element.addEventListener('click', function(event) {
            const url = `/tv/watch?s=${id}&e=${this.id}`;
            window.location.href = url;
        });
    });
}

function populateSeasons() {

    for(let i=0;i<episodes.length;i++){
        if (!seasons.includes(episodes[i].season)) {
            seasons.push(episodes[i].season)
        }
    }

    if(seasons.length > 1){
        for(let s=0;s<seasons.length;s++){
            const newItem = document.createElement('div');
            newItem.classList.add("season-item");
            if(seasons.length > 5){
                newItem.classList.add("small");
            }
            newItem.innerHTML = `Season ${seasons[s]}`;
            seasonContainer.appendChild(newItem);
        }
    }

    const items = document.querySelectorAll('.season-item');
	items.forEach(element => {
		element.addEventListener('click', function(event) {

            for(let i=0;i<items.length;i++){
                items[i].classList.remove("active");
            }

            this.classList.add("active");

            const raw = this.innerHTML;
            season = raw.replace("Season ", "");
            episodes = [];
            for(let i=0;i<(library[id].episodes).length;i++){
                if(library[id].episodes[i].season == season){
                    episodes.push(library[id].episodes[i]);
                }
            }
            wrapper.scrollTo({
                top: originalTop,
                left: originalLeft,
                behavior: 'smooth'
            });
            episodeContainer.innerHTML = "";
            episodeContainer.style.width = "0px";
            populateEpisodes();
  		});
	});

}


returnHome.addEventListener('click', function(event){
    details.classList.remove("active");
    episodes = [];
    seasons = [];
    seasonContainer.innerHTML = "";
    episodeContainer.innerHTML = "";
});

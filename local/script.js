import jsonConfig from 'https://t-yauk.github.io/peak-theatre/library.json' with {type: "json"};
import genreConfig from 'https://t-yauk.github.io/peak-theatre/lists/genres.json' with {type: "json"};
import yearConfig from 'https://t-yauk.github.io/peak-theatre/lists/years.json' with {type: "json"};
import directorConfig from 'https://t-yauk.github.io/peak-theatre/directors.json' with {type: "json"};

const data = jsonConfig.movies;
const genres = genreConfig.genres;
const years = yearConfig.years;
const directors = directorConfig.directors;

const container = (document.getElementsByClassName("library-wrapper"))[0];
const menuContaienr = (document.getElementsByClassName("menu-container"))[0];
const mainMenuItems = document.querySelectorAll(".main-menu-item");
const popover = (document.getElementsByClassName("popover-wrapper"))[0];
const movieItems = document.querySelectorAll(".movie-menu-item");
const loading = (document.getElementsByClassName("loading"))[0];
const menuWrapper = (document.getElementsByClassName("menu-wrapper"))[0];

let filter = ["all", "all"];
let menuType = "genre";
let library;
let id;

window.onload = function() {

    populateMenu();

    defineLibrary();

}

async function populateMenu() {

    if(menuType == "genre"){
        for(let i=0;i<genres.length;i++){
            const newItem = document.createElement('button');
            newItem.classList.add("menu-item");
            newItem.innerHTML = genres[i];
            menuContaienr.appendChild(newItem);
        }
    }else if(menuType == "year"){
        for(let i=0;i<years.length;i++){
            const newItem = document.createElement('button');
            newItem.classList.add("menu-item");
            newItem.innerHTML = years[i];
            menuContaienr.appendChild(newItem);
        }
    }else if(menuType == "director"){
        for(let i=0;i<directors.length;i++){
            const newItem = document.createElement('button');
            newItem.classList.add("menu-item");
            newItem.innerHTML = directors[i];
            menuContaienr.appendChild(newItem);
        }
    }

    const items = document.querySelectorAll('.menu-item');
    items.forEach(element => {
        element.addEventListener('click', function(event){

            filter[0] = menuType;

            for(let x=0;x<items.length;x++){
                items[x].classList.remove("active");
            }

            this.classList.add("active");
            const raw = this.innerHTML;

            if(menuType == "genre"){
                filter[1] = raw.replaceAll(" Movies", "");
            }else if(menuType == "year"){
                if(raw == "2026 Movies"){
                    filter[1] = "2026";
                }else{
                    filter[1] = raw.slice(0, 3);
                }
            }else if(menuType == "director"){
                filter[1] = raw;
            }
            
            container.innerHTML = "";
            defineLibrary();

            container.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

        });
    });

}

async function defineLibrary() {

    if(filter[0] == "all"){
        library = data;
    }else if(filter[0] == "genre"){
        library = data.filter(movies => movies.genre && movies.genre.includes(filter[1]));
    }else if(filter[0] == "year"){
        library = data.filter(movies => movies.year && movies.year.includes(filter[1]));
    }else if(filter[0] == "director"){
        library = data.filter(movies => movies.director && movies.director.includes(filter[1]));
    }

    populate();

}

async function populate() {

    for(let i=0;i<library.length;i++){
        const newItem = document.createElement('div');

        newItem.classList.add("library-item");

        const title = library[i].title;
        const year = library[i].year;

        for(let d=0;d<data.length;d++){
            if(data[d].title == title && data[d].year == year){
                newItem.id = d;
                break;
            }
        }

        newItem.innerHTML = `<div class="overlay"></div><img src="${library[i].image_url}">`;
        container.appendChild(newItem);
    }

    libraryListener();

}

async function libraryListener() {

    const items = document.querySelectorAll(".library-item");
    items.forEach(element => {
        element.addEventListener('click', function(event) {

            const conentContainer = (document.querySelector('.popover .contents'));
            const thePopOver = (document.querySelector('.popover'));
            id = Number(this.id);

            document.getElementById("artwork").src = data[id].image_url;
            document.getElementById("the-title").innerHTML = data[id].title;
            document.getElementById("director").innerHTML = `Directed By ${data[id].director}`;
            document.getElementById("description").innerHTML = data[id].description;
            document.getElementById("year").innerHTML = data[id].year;

            popover.classList.add("active");

            const popoverWidth = Number(thePopOver.offsetWidth);
            const imageWidth = Number(document.getElementById("artwork").offsetWidth);
            const width = ((popoverWidth - imageWidth) - 50);
            conentContainer.style.width = `${width}px`;

        });
    });

}



mainMenuItems.forEach(element => {
    element.addEventListener('click', function(event){

        menuWrapper.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        for(let i=0;i<mainMenuItems.length;i++){
            mainMenuItems[i].classList.remove("active");
        }

        this.classList.add("active");

        if(this.id == "all"){
            const items = document.getElementsByClassName("menu-item");
            for(let x=0;x<items.length;x++){
                items[x].classList.remove("active");
            }
            filter[0] = "all";
            container.innerHTML = "";
            defineLibrary();
        }else{
            menuType = this.id;
            menuContaienr.innerHTML = "";
            populateMenu();
        }

    });
});






popover.addEventListener('click', function(e) {
  // Check if the clicked element is exactly the parent
  if (e.target === e.currentTarget) {
    popover.classList.remove("active");
  }
});

movieItems.forEach(element => {
    element.addEventListener('click', function(event){
        if(this.id == "play"){
            popover.classList.remove("active");
            loading.classList.add("active");
            const url = "/watch?v=" + id;
            window.location.href = url;
        }
    });
});

import jsonConfig from 'https://t-yauk.github.io/peak-theatre/library.json' with {type: "json"};
const filter = localStorage.getItem('filter');
const container = (document.getElementsByClassName("library"))[0];
const pw = (document.getElementsByClassName("profile-wrapper"))[0];
let library;
let movieItems;
let id;

window.onload = function() {

	if(filter == "all"){
		library = jsonConfig.movies;
	}

	populate();

}

function populate(){

	for(let i=0;i<library.length;i++){
		const newItem = document.createElement('div');
		newItem.classList.add("movie-item");
		newItem.id = i;
		newItem.style.backgroundImage = "url('" + library[i].previewImage + "')";
		newItem.innerHTML = "<div class='gradient'></div><span class='title'>" + library[i].title + "</span>";
		container.appendChild(newItem);
	}

	movieItems = document.querySelectorAll('.movie-item');
	movieItems.forEach(element => {
		element.addEventListener('click', function(event) {
			id = Number(this.id);
			populateProfile();
			console.log(id);
  		});
	});

}


function populateProfile(){

	document.getElementById("image").src = library[id].image_url;
	document.getElementById("title").innerHTML = library[id].title;
	document.getElementById("year").innerHTML = library[id].year;
	document.getElementById("description").innerHTML = library[id].description;
	setTimeout(function() {
		showprofile();
	}, 100);

}

function showprofile(){

	pw.classList.add("active");

}

const parent = document.querySelector('.profile-wrapper');

parent.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    pw.classList.remove("active");
  }
});


window.watch = function () {
	const url = "watch.html?" + id;
	window.location.href = url;
}







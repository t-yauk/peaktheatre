import jsonConfig from 'https://t-yauk.github.io/peak-theatre/library.json' with {type: "json"};
const library = jsonConfig.movies;
const container = (document.getElementsByClassName("library"))[0];

window.onload = function() {

	populate();

}

function populate() {

	for(let i=0;i<library.length;i++){

		const newItem = document.createElement('div');
		newItem.classList.add("apple-tv-card-container");
		newItem.innerHTML = "<div class='apple-tv-card'><a class='content' style=\"background-image:url('" + library[i].previewImage + "');\"></a><div class='parallax-content'><div class='content-wrapper'><span class='title'>" + library[i].title + "</span></div></div>";
		container.appendChild(newItem);

	}

}

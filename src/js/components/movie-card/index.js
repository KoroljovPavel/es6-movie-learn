import config from '../../config';
const listWrapper = document.querySelector('.list-wrapper'),
	  movieWrapper = document.querySelector('.movie-wrapper');

function renderMovie(data) {
	const mappingData = mapData(data),
		  html = `
		  		<a class="back">Back</a>
				<a href="${data.id}" class="movie-link">
					<h2>${mappingData.title}</h2>
					<date>${mappingData.date}</date>
					<div><img src="${mappingData.imgSrc}"/></div>
					<div>${mappingData.language}</div>
					<div>${mappingData.overview}</div>
					<div>${mappingData.popularity}</div>
					<div>${mappingData.episodesCount}</div>
					<div>${mappingData.seasonsCount}</div>
					<div>${mappingData.homeUrl}</div>
				</a>
			`;
	render(html);
}

function mapData(data) {
	return {
		id: data.id,
		title: data.title || data.name || 'Unknown',
		date: data.release_date,
		imgSrc: getPictureUrl(),
		language: data.original_language,
		overview: data.overview,
		popularity: data.popularity,
		episodesCount: data.number_of_episodes,
		seasonsCount: data.number_of_seasons,
		homeUrl: data.homepage
	};

	function getPictureUrl() {
		const url = data.backdrop_path || data.poster_path;
		if (url) {
			return config.imageSrc + url;
		} else {	
			return config.noImageSrc;
		}
	}
}

function render(html) {
	const element = document.createElement('article');

	element.classList.add('movie');
	element.innerHTML = html;
	listWrapper.style.display = 'none';
	movieWrapper.style.display = 'block';
	movieWrapper.innerHTML = '';
	movieWrapper.appendChild(element);

	const backButton = document.querySelector('.back');
	backButton.addEventListener('click', back);
}

function back() {
	listWrapper.style.display = 'block';
	movieWrapper.style.display = 'none';
}

export default {
	renderMovie,
	back
}
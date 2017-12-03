import config from '../../config';

export default function movie (data) {
	const mappingData = mapData(data);

	return `
		<a href="${data.id}" class="movie-link">
			<h2>${mappingData.title}</h2>
			<date>${mappingData.date}</date>
			<div><img src="${mappingData.imgSrc}"/></div>
			<div>${mappingData.language}</div>
			<div>${mappingData.overview}</div>
			<div>${mappingData.popularity}</div>
		</a>
	`;
}

function mapData(data) {
	return {
		id: data.id,
		title: data.title || data.name || 'Unknown',
		date: data.release_date,
		imgSrc: getPictureUrl(),
		language: data.original_language,
		overview: data.overview,
		popularity: data.popularity
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
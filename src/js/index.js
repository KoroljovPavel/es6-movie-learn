import MovieList from './components/movie-list';
import movieCard from './components/movie-card';
import moviesService from './movies-service';

const input = document.querySelector('.search-input'),
	  movieList = document.querySelector('.movies'),
	  list = new MovieList(),
	  filters = document.querySelector('.filters');

input.addEventListener('input', e => {
	const searchText = e.target.value;

	if(!searchText) {
		list.clearList(movieList);
		return;
	}

	moviesService.getVideoByText(searchText)
		.then(data => {
			list.init(data);
			list.renderMovies(data.results);
			list.drawToDom(movieList);
		})
});

filters.addEventListener('click', e => {
	e.preventDefault();
	const target = e.target,
		  dataAttr = target.getAttribute('data-filter');

	if (!dataAttr) {
		return;
	}

	list.sort(dataAttr);
});

movieList.addEventListener('click', e => {
	e.preventDefault();
	const target = e.target,
		link = target.closest('.movie-link');
	let id;

	if (!link) {
		return;
	}

	id = link.getAttribute('href');
	moviesService.getVideoById(id)
		.then(data => {
			movieCard.renderMovie(data);
		});
});
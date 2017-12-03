import movie from '../movie';

export default class MovieList {
	init(data) {
		this.data = data;
	}
	drawToDom(selector) {
		this.selector = selector;
		this.clearList(selector);
		selector.appendChild(this.fragment);
	}

	renderMovies(data) {
		this.fragment = document.createDocumentFragment();
		data.forEach(d => {
			const article = document.createElement('article');
			article.classList.add('movie');
			article.innerHTML = movie(d);
			this.fragment.appendChild(article);
		});
	}

	clearList(selector) {
		selector.innerHTML = '';
	}

	sort(filter) {
		const data = [...this.data.results];
		debugger;
		if (filter === 'raiting-max') {
			this.sortByMaxRating(data);
		}

		if (filter === 'raiting-min') {
			this.sortByMinRating(data);
		}

		if (filter === 'date-new') {
			this.sortByNew(data);
		}

		if (filter === 'date-old') {
			this.sortByOld(data);
		}
	}

	sortByMaxRating(data) {
		data.sort((a, b) => {
			if(a.popularity < b.popularity) {
				return 1;
			}

			if(a.popularity > b.popularity) {
				return -1;
			}
		});

		this.renderMovies(data);
		this.drawToDom(document.querySelector('.movies'));
	}

	sortByMinRating(data) {
		data.sort((a, b) => {
			if(a.popularity > b.popularity) {
				return 1;
			}

			if(a.popularity < b.popularity) {
				return -1;
			}
		});

		this.renderMovies(data);
		this.drawToDom(document.querySelector('.movies'));
	}

	sortByNew(data) {
		data.sort((a, b) => {
			if(new Date(a.release_date) < new Date(b.release_date)) {
				return 1;
			}

			if(new Date(a.release_date) > new Date(b.release_date)) {
				return -1;
			}
		});

		this.renderMovies(data);
		this.drawToDom(document.querySelector('.movies'));
	}

	sortByOld(data) {
		data.sort((a, b) => {
			if(new Date(a.release_date) > new Date(b.release_date)) {
				return 1;
			}

			if(new Date(a.release_date) < new Date(b.release_date)) {
				return -1;
			}
		});

		this.renderMovies(data);
		this.drawToDom(document.querySelector('.movies'));
	}

	hide() {
		this.selector.style.display = 'none';
	}
}
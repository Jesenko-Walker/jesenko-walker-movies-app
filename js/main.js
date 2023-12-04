import { renderMovies, saveChanges} from '../api/render.js';
import {getMovie, getMovies, patchMovie, postMovie} from '../api/movies-api.js';


const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const handleSearch = async () => {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    try {
        const movies = await getMovies();
        const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
        renderMovies(filteredMovies);
    } catch (error) {
        console.error('Error searching movies:', error);
    }
};

const openAddMovieModal = () => {
    const modal = new bootstrap.Modal(document.getElementById('addMovieModal'));
    modal.show();
};

const addMovie = async () => {
    try {
        const title = document.getElementById('addTitle').value;
        const rating = parseFloat(document.getElementById('addRating').value);
        const genres = [];

        const newMovie = {
            title,
            rating,
            genres,
        };

        await postMovie(newMovie);
        const movies = await getMovies();
        await renderMovies(movies);
    } catch (error) {
        console.error('Error adding movie:', error);
    }
};

//MAIN
(async () => {
    const newMovieButton = document.getElementById('saveNewMovieButton');
    const movies = await getMovies();
    renderMovies(movies);
    const saveChangesButton = document.getElementById('saveChangesButton');
    saveChangesButton.addEventListener('click', () => saveChanges());
    const debouncedSearch = debounce(handleSearch, 300);
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debouncedSearch);
    document.getElementById('addMovieButton').addEventListener('click', () => openAddMovieModal());
    document.getElementById('saveNewMovieButton').addEventListener('click', () => saveNewMovie());
    newMovieButton.addEventListener('click', () => addMovie());
})();
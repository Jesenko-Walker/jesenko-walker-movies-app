import { renderMovies, saveChanges} from '../api/render.js';
import { getMovies } from '../api/movies-api.js';


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





//MAIN
(async () => {
    const movies = await getMovies();
    renderMovies(movies);
    const saveChangesButton = document.getElementById('saveChangesButton');
    saveChangesButton.addEventListener('click', () => saveChanges());
    const debouncedSearch = debounce(handleSearch, 300);
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debouncedSearch);
})();


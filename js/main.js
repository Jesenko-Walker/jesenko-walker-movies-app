
import { getMovies, deleteMovie} from "../api/movies-api.js";

const renderMovies = async () => {
    const movieList = document.getElementById('movies-list');

    try {
        const movies = await getMovies();

        movieList.innerHTML = '';

        movies.forEach(movie => {
            const card = document.createElement('div');
            card.classList.add('card', 'mb-3');

            const posterImg = document.createElement('img');
            posterImg.src = 'https://via.placeholder.com/150';
            posterImg.classList.add('card-img-top');
            posterImg.alt = 'Movie Poster';
            card.appendChild(posterImg);

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const titleElement = document.createElement('h5');
            titleElement.classList.add('card-title');
            titleElement.textContent = movie.title;
            cardBody.appendChild(titleElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.classList.add('card-text');
            descriptionElement.textContent = movie.description;
            cardBody.appendChild(descriptionElement);

            // Rating bar
            const ratingBar = document.createElement('div');
            ratingBar.classList.add('rating-bar');

            const ratingFill = document.createElement('div');
            ratingFill.classList.add('rating-fill');
            ratingFill.style.width = `${(movie.rating / 5) * 100}%`; // Convert rating to percentage
            ratingFill.style.backgroundColor = '#ffc107'; // Set the fill color (e.g., yellow)

            ratingBar.appendChild(ratingFill);

            // Rating text
            const ratingText = document.createElement('div');
            ratingText.classList.add('rating-text');
            ratingText.textContent = `${movie.rating}/5`;

            // Append both rating bar and rating text to the card body
            cardBody.appendChild(ratingBar);
            cardBody.appendChild(ratingText);

            // Genres
            const genresElement = document.createElement('div');
            genresElement.classList.add('mb-3');

            const genresStrong = document.createElement('strong');
            genresStrong.textContent = 'Genres:';
            genresElement.appendChild(genresStrong);

            movie.genres.forEach(genre => {
                const genreButton = document.createElement('button');
                genreButton.type = 'button';
                genreButton.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'ml-2');
                genreButton.textContent = genre;
                genresElement.appendChild(genreButton);
            });

            cardBody.appendChild(genresElement);

            // Dropdown button
            const dropdownButton = document.createElement('button');
            dropdownButton.classList.add('btn', 'btn-secondary', 'dropdown-toggle');
            dropdownButton.setAttribute('type', 'button');
            dropdownButton.setAttribute('data-bs-toggle', 'dropdown'); // Updated attribute
            dropdownButton.setAttribute('aria-haspopup', 'true');
            dropdownButton.setAttribute('aria-expanded', 'false');
            dropdownButton.textContent = 'Options';

            // Dropdown menu
            const dropdownMenu = document.createElement('div');
            dropdownMenu.classList.add('dropdown-menu');
            dropdownMenu.setAttribute('aria-labelledby', 'dropdownMenuButton');

            // Remove button
            const removeButton = document.createElement('button');
            removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', async () => {
                try {
                    // Delete the movie from the server
                    await deleteMovie(movie.id);


                    await renderMovies();
                } catch (error) {
                    console.error('Error removing movie:', error);
                }
            });

            cardBody.appendChild(removeButton);

            dropdownMenu.appendChild(removeButton);

            // Append dropdown button and menu to the card body
            cardBody.appendChild(dropdownButton);
            cardBody.appendChild(dropdownMenu);

            card.appendChild(cardBody);

            // Append the card to the movie list
            movieList.appendChild(card);
        });
    } catch (error) {
        console.error('Error getting movies:', error);
        movieList.innerHTML = '<p>Error loading movies</p>';
    }
};


//MAIN
(async () => {
    const movies = await getMovies();
    await renderMovies()
})();




// Function to handle tab content filtering
function filterTabContent(tabId) {
    // Replace this with your logic to filter content based on the selected tab
    console.log(`Filtering content for tab: ${tabId}`);
}

// Function to handle the "Add Movie" button click
function handleAddMovieButtonClick() {
    // Replace this with your logic to add a movie
    console.log("Add Movie button clicked");
}

// Event listener for tab button clicks
document.querySelectorAll('.nav-link').forEach(tabButton => {
    tabButton.addEventListener('click', function() {
        const tabId = this.getAttribute('aria-controls');
        filterTabContent(tabId);
    });
});

// Event listener for "Add Movie" button click
document.getElementById('addMovieButton').addEventListener('click', handleAddMovieButtonClick);


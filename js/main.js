
import { getMovies } from "../api/movies-api.js";
const renderMovies = (movies) => {
    const movieList = document.getElementById('movies-list');

    if (!movies || !Array.isArray(movies) || movies.length === 0) {
        movieList.innerHTML = '<p>No movies available</p>';
        return;
    }

    // Clear existing content
    movieList.innerHTML = '';

    movies.forEach(movie => {
        // Create a new card element
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');

        // Movie poster
        const posterImg = document.createElement('img');
        posterImg.src = 'https://via.placeholder.com/150';
        posterImg.classList.add('card-img-top');
        posterImg.alt = 'Movie Poster';
        card.appendChild(posterImg);

        // Card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Title
        const titleElement = document.createElement('h5');
        titleElement.classList.add('card-title');
        titleElement.textContent = movie.title;
        cardBody.appendChild(titleElement);

        // Description
        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('card-text');
        descriptionElement.textContent = movie.description;
        cardBody.appendChild(descriptionElement);

        // Rating bar
        const ratingBar = document.createElement('div');
        ratingBar.classList.add('rating-bar');

        const ratingFill = document.createElement('div');
        ratingFill.classList.add('rating-fill');
        ratingFill.style.width = `${(movie.rating / 10) * 100}%`; // Convert rating to percentage
        ratingBar.appendChild(ratingFill);

        cardBody.appendChild(ratingBar);

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

        // Watch Now button
        const watchNowButton = document.createElement('a');
        watchNowButton.href = '#';
        watchNowButton.classList.add('btn', 'btn-primary');
        watchNowButton.textContent = 'Watch Now';
        cardBody.appendChild(watchNowButton);

        card.appendChild(cardBody);

        // Append the card to the movie list
        movieList.appendChild(card);
    });
};


// MAIN
(async () => {
    let movies = await getMovies();
    renderMovies(movies);
})();


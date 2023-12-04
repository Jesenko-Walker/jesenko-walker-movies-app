import { getMovies, deleteMovie, patchMovie, getMovie } from "./movies-api.js";

export const renderMovies = async () => {
    const movieList = document.getElementById('movies-list');
    const loadingMessage = document.getElementById('loadingMessage');

    try {
        loadingMessage.style.display = 'block';
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
            dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
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

            // Edit button
            const editButton = document.createElement('button');
            editButton.classList.add('btn', 'btn-primary', 'btn-sm', 'ml-2');
            editButton.textContent = 'Edit';

            editButton.dataset.movieId = movie.id;

            editButton.addEventListener('click', (event) => {
                // Retrieve the movie ID from the data attribute
                const movieId = event.target.dataset.movieId;

                // Call the openEditModal function with the movie and movieId
                openEditModal(movie, movieId);
            });


            dropdownMenu.appendChild(editButton);
            dropdownMenu.appendChild(removeButton);

            cardBody.appendChild(dropdownButton);
            cardBody.appendChild(dropdownMenu);

            card.appendChild(cardBody);

            movieList.appendChild(card);
            loadingMessage.style.display = 'none';
        });
    } catch (error) {
        console.error('Error getting movies:', error);
        movieList.innerHTML = '<p>Error loading movies</p>';
    }
};

export const openEditModal = (movie, movieId) => {
    const modal = new bootstrap.Modal(document.getElementById('editModal'));

    document.getElementById('editTitle').value = movie.title;
    document.getElementById('editDescription').value = movie.description;
    document.getElementById('editRating').value = movie.rating;
    document.getElementById('editGenres').value = movie.genres.join(', ');

    const saveChangesButton = document.getElementById('saveChangesButton');
    saveChangesButton.dataset.movieId = movieId;


    saveChangesButton.addEventListener('click', () => saveChanges());

    modal.show();
};

export const saveChanges = async () => {
    try {
        const saveChangesButton = document.getElementById('saveChangesButton');
        const movieId = saveChangesButton.dataset.movieId;

        const currentMovie = await getMovie(movieId);

        const updatedTitle = document.getElementById('editTitle').value;
        const updatedDescription = document.getElementById('editDescription').value;
        const updatedRating = parseFloat(document.getElementById('editRating').value);

        const updatedMovie = {
            ...currentMovie,
            title: updatedTitle,
            description: updatedDescription,
            rating: updatedRating,
        };

        await patchMovie(updatedMovie);

        await renderMovies();
    } catch (error) {
        console.error('Error saving changes:', error);
    }
};
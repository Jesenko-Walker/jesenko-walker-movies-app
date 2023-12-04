import { renderMovies, saveChanges} from '../api/render.js';

//MAIN

// Function to open the 'Add Movie' modal
const openAddMovieModal = () => {
    const modal = new bootstrap.Modal(document.getElementById('addMovieModal'));
    modal.show();
};

// Function to save a new movie
// Function to save a new movie locally
const saveNewMovie = async () => {
    try {
        const addTitle = document.getElementById('addTitle').value;
        const addRating = parseFloat(document.getElementById('addRating').value);

        if (!addTitle || isNaN(addRating)) {
            // Validation failed, show an error message or handle it accordingly
            console.error('Please fill out all required fields.');
            return;
        }

        const newMovie = {
            title: addTitle,
            rating: addRating,
            // You can add other properties if needed
        };

        // Retrieve existing movies from localStorage or initialize an empty array
        const existingMovies = JSON.parse(localStorage.getItem('movies')) || [];

        // Add the new movie to the array
        existingMovies.push(newMovie);

        // Save the updated array back to localStorage
        localStorage.setItem('movies', JSON.stringify(existingMovies));

        // Close the modal after saving
        const modal = new bootstrap.Modal(document.getElementById('addMovieModal'));
        modal.hide();

        // Refresh the movie list
        await renderMovies();
    } catch (error) {
        console.error('Error saving new movie:', error);
    }
};


// IIFE (Immediately Invoked Function Expression)
(async () => {
        // Render movies when the DOM is loaded
        await renderMovies();

        // Event listener for the 'Add Movie' button
        document.getElementById('addMovieButton').addEventListener('click', () => openAddMovieModal());

        // Event listener for the 'Save New Movie' button
        document.getElementById('saveNewMovieButton').addEventListener('click', () => saveNewMovie());

        // Attach an event listener to the 'Save Changes' button
        const saveChangesButton = document.getElementById('saveChangesButton');
        saveChangesButton.addEventListener('click', () => saveChanges());
})();
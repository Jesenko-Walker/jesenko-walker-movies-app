import { renderMovies, saveChanges} from '../api/render.js';


//MAIN
(async () => {
    await renderMovies()
    const saveChangesButton = document.getElementById('saveChangesButton');
    saveChangesButton.addEventListener('click', () => saveChanges());
})();


const getSearchResults = async (query) => {
    try {
        // Perform an API call or any other logic to get search results based on the query
        // Replace the following line with your actual implementation
        const response = await fetch('http://localhost:3000/movies');
        const data = await response.json();

        // Assuming the API response contains an array of search results
        return data.results;
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error; // Re-throw the error to be caught in the calling function
    }
};
// Function to search movies based on the query
const searchMovies = async (query) => {
    // Implement the logic to search movies based on the query
    // For example, you can use an API or search within the existing movies array
    // Update the movieList with the search results
    // You can use the renderMovies function to display the search results
    const movieList = document.getElementById('movies-list');
    movieList.innerHTML = ''; // Clear the existing movie list

    try {
        // Implement the logic to get search results based on the query
        const searchResults = await getSearchResults(query);

        searchResults.forEach(movie => {
            // Render each movie card similar to how it's done in renderMovies
            // ...

            // Append the card to the movie list
            movieList.appendChild(card);
        });
    } catch (error) {
        console.error('Error searching movies:', error);
        movieList.innerHTML = '<p>Error loading search results</p>';
    }
};


const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get the search input value
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim();

    // Call the searchMovies function with the entered query
    await searchMovies(searchQuery);
});
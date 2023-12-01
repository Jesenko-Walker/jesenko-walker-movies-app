
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



//main

(()=>{

})();

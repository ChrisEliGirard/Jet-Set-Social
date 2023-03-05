//const searchEl = document.querySelector('#search-bar');

const searchQuery = async (event) => {
    event.preventDefault();

    //Collect Search Inquiry from the searchbar
    const searchRaw = document.querySelector('#search-bar').value.trim().toLowerCase();
    document.location.replace('/search/'+searchRaw);
};


//searchEl.addEventListener('submit', searchQuery);
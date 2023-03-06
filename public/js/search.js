const searchQuery = async (event) => {
    event.preventDefault();

    //Collect Search Inquiry from the searchbar
    const searchRaw = document.querySelector('#search-bar').value.trim().toLowerCase();
    console.log(searchRaw)
    document.location.replace('/search/'+searchRaw);
};




const searchEl = document.querySelector('#search-form');
searchEl.addEventListener('submit', searchQuery);
const searchQuery = (event) => {
    event.preventDefault();

    //Collect Search Inquiry from the searchbar
    const searchRaw = document.querySelector('.userInput').value.trim().toLowerCase();
     document.location.replace('/search/'+searchRaw);
};


const init = () => {
    const searchEl = document.getElementById('.userInput');
    searchEl.addEventListener('input', searchQuery);
};

window.onload = init();
const tripCreateForm = document.querySelector('.tripCreate-form');


const tripCreateFormHandler = async (event) => {
	event.preventDefault();

	const newTrip = new FormData(tripCreateForm);
	const response = await fetch('/api/trips', {
		method: 'POST',
		body: newTrip,
	});

	if (response.ok) {
		document.location.replace(`/trips/${res.trip.id}`);
	} else {
		alert(response.statusText);
	}
};


tripCreateForm.addEventListener('submit', tripCreateFormHandler);
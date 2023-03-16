const tripCreateForm = document.querySelector('.tripCreate-form');
const tagUserDiv = document.querySelector('#tagged-user-div');
const addUserButton = document.querySelector('#addUser');

let i = 2
const addTagUser = (event) => {
	event.preventDefault();
	
	tagUserDiv.appendChild = `<label for="tagUsers" class="text-sm text-lime-400">Enter your friend's Username each followed by an appostraphe</label><br>
	<input type="text" list="users" name="tagUsers${i}" id="tagUsers${i}"
		class="h-8 w-full rounded-md border text-sm pl-2 outline-lime-600 shadow-sm" placeholder="UserName"/>`
	return i++
}

const tripCreateFormHandler = async (event) => {
	event.preventDefault();

	const newTrip = new FormData(tripCreateForm);
	const response = await fetch('/api/trips', {
		method: 'POST',
		body: newTrip,
	});

	const data = await response.json();
	if (response.ok) {
		document.location.replace(`/trips/${data.id}`);
	} else {
		alert(response.statusText);
	}
};

addUserButton.addEventListener('click', addTagUser);
tripCreateForm.addEventListener('submit', tripCreateFormHandler);
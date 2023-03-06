const newCommentEl = document.getElementById("newComment");
const commentTextEl = document.querySelector('#comment-text');

// Process the submission of new comments
newCommentEl.onclick = async (event) => {
	event.preventDefault();
	const newComment = commentTextEl.value.trim();
	const index = JSON.parse(event.target.getAttribute('data-trip'));

	// Return if the comment is empty
	if (newComment.length === 0) return;

	// generate random location for now, to be updated later
	const location = Math.floor(Math.random() * 16);

	// Create a new comment and send the post request.
	const addComment = {
		post_index: index,
		comment: newComment,
		location: location,
	};

	// send the add new comment request
	const response = await fetch('/api/comments/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newNote),
	});

	// If successful, update the browser to display the new comments
	if (response.ok) {
		await response.json();
		location.reload();
	} else {
		displayError('Failed to add new comment!');
	}
};
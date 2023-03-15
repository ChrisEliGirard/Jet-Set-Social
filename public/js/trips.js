const newCommentEl = document.getElementById("newComment");
const commentTextEl = document.querySelector('#comment-text');
const tripCommentsEl = document.querySelector("#trip-comments");
const tripIndex = tripCommentsEl.getAttribute('data-trip');

// Process the submission of new comments
newCommentEl.onclick = async (event) => {
	event.preventDefault();
	const newComment = commentTextEl.value.trim();
	// const index = JSON.parse(event.target.getAttribute('data-trip'));
	const index = 1;

	// Return if the comment is empty
	if (newComment.length === 0) return;

	// generate random location for now, to be updated later
	const tripLocation = Math.floor(Math.random() * 15) + 1;

	// Create a new comment and send the post request.
	const addComment = {
		post_index: tripIndex,
		comment: newComment,
		location: tripLocation,
	};

	console.log(addComment);

	// send the add new comment request
	const response = await fetch('/api/comments/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(addComment),
	});

	if (response.ok) {
		await response.json();
		location.reload();
	} else {
		alert('Failed to add new comment!');
	}
};

tripCommentsEl.addEventListener("click", async (event) => {
	const element = event.target;
	const elementId = element.getAttribute('id');
	let commentStat = elementId === 'update' || elementId === 'delete';
	if (!commentStat) {
		return;
	}

	// console.log(elementId);
	// return;

	commentStat = element.parentElement.getAttribute('data-number');
	if (elementId === 'delete') {
		await deleteComment(commentStat);
	} else {
		let index = element.parentElement.getAttribute('data-comment');
		await updateComment(commentStat, index);
	}
});


// Update the comment
const updateComment = async (commentId, index) => {
	console.log(commentId);
	console.log(index);
	// const commentIndex = 'comment' + index;
	// commentTextEl.value = document.getElementById(commentIndex).textContent;
	// newCommentEl.style.display = "none";
	// updateCommentEl.style.display = "inline-block";
	// updateCommentEl.setAttribute('data-comment', commentId);
	// modalEl.style.display = "block";
};

// Delete a comment
const deleteComment = async (commentId) => {
	console.log(commentId);
	// const response = await fetch(`/api/comments/${commentId}`, {
	// 	method: 'DELETE',
	// });

	// if (response.ok) {
	// 	location.reload();
	// } else {
	// 	displayError('Failed to add delete the comment!');
	// }
};

// // Process the submission of updated comments
// updateCommentEl.onclick = async (event) => {
// 	event.preventDefault();
// 	let newComment = commentTextEl.value.trim();
// 	let index = JSON.parse(event.target.getAttribute('data-index'));
// 	let commentId = event.target.getAttribute('data-comment');
// 	closeModal();

// 	// Return if the comment is empty
// 	if (newComment.length === 0) return;

// 	// Create a new comment and send the post request.
// 	const newNote = {
// 		post_index: index,
// 		comment: newComment,
// 		date: new Date().toISOString(),
// 	};

// 	// send the update request
// 	const response = await fetch(`/api/comments/${commentId}`, {
// 		method: 'PUT',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(newNote),
// 	});

// 	// If successful, update the browser to display the new comments
// 	if (response.ok) {
// 		await response.json();
// 		location.reload();
// 	} else {
// 		displayError('Failed to update the comment!');
// 	}
// };
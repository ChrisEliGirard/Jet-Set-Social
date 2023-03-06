const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const userInfo = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (userInfo && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ userInfo, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#login-form')
  .addEventListener('click', loginFormHandler);

// document
//   .querySelector('#signup-form')
//   .addEventListener('submit', signupFormHandler);


// const sign_in_btn = document.querySelector("#sign-in-btn");
// const sign_up_btn = document.querySelector("#sign-up-btn");
// const container = document.querySelector(".container");
// const sign_in_btn2 = document.querySelector("#sign-in-btn2");
// const sign_up_btn2 = document.querySelector("#sign-up-btn2");

// sign_up_btn.addEventListener("click", () => {
//   container.classList.add("sign-up-mode");
// });

// sign_in_btn.addEventListener("click", () => {
//   container.classList.remove("sign-up-mode");
// });

// sign_up_btn2.addEventListener("click", () => {
//   container.classList.add("sign-up-mode2");
// });

// sign_in_btn2.addEventListener("click", () => {
//   container.classList.remove("sign-up-mode2");
// });

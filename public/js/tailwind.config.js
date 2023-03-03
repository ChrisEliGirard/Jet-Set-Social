/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/views/*.{html,js}"],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  
  
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
  <html class="h-full bg-gray-50">
  <body class="h-full">
  ```
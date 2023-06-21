// Retrieve DOM elements
// TODO: Get references to the required DOM elements using document.getElementById()

// Array of predefined poster objects
const posters = [
  {
    image: 'image-url-1.jpg',
    title: 'Poster 1',
    quote: 'Quote 1',
  },
  {
    image: 'image-url-2.jpg',
    title: 'Poster 2',
    quote: 'Quote 2',
  },
  {
    image: 'image-url-3.jpg',
    title: 'Poster 3',
    quote: 'Quote 3',
  },
  // Add more poster objects as needed
];

// Event listener for randomize button
// TODO: Add an event listener to the randomizeButton that calls a function when clicked

// Event listener for submit button
// TODO: Add an event listener to the submitButton that calls a function when clicked

// Function to generate a random poster
function generateRandomPoster() {
  // TODO: Generate a random index within the range of the posters array length

  // TODO: Retrieve the random poster object from the posters array

  // TODO: Call the function to update the DOM with the values from the random poster object
}

// Function to generate a custom poster
function generateCustomPoster(event) {
  event.preventDefault();

  // TODO: Retrieve the entered quote and author from the input fields

  // TODO: Create a custom poster object with the entered values

  // TODO: Call the function to update the DOM with the values from the custom poster object
}

// Function to update the poster content in the DOM
function updatePoster(imageUrl, title, quote) {
  // TODO: Update the DOM with the values provided for the poster image, title, and quote
}

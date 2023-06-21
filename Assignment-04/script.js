// Array of predefined poster objects
const posters = [
  {
    image: 'https://www.azquotes.com/vangogh-image-quotes/17/76/Quotation-John-Locke-What-worries-you-masters-you-17-76-54.jpg',
    title: 'Locke Motivation',
    quote: 'What worries you, masters you.',
  },
  {
    image: 'https://i.pinimg.com/736x/d1/ef/b3/d1efb39b11857abb2ac947f0b9543b4b--its-ok-live.jpg',
    title: 'Living Life',
    quote: 'It is okay to live a life others do not understand.',
  },
  {
    image: 'https://tinyurl.com/4766p7um',
    title: 'Mark Twain Quote',
    quote: 'The fear of death follows from the fear of life. A man who lives fully is prepared to die at any time.',
  },
  // Add more poster objects as needed
];

// Event listener for randomize button
// TODO: Add an event listener to the randomizeButton that calls a function when clicked
let randomizeButton = document.getElementById('randomize').addEventListener('click', generateRandomPoster);
// Event listener for submit button
// TODO: Add an event listener to the submitButton that calls a function when clicked
let submitButton = document.getElementById('submit').addEventListener('click', generateCustomPoster);

// Function to generate a random poster
function generateRandomPoster() {
  // TODO: Generate a random index within the range of the posters array length
  let index = Math.floor(Math.random() * posters.length);
  let newPoster = posters[index];
  // TODO: Call the function to update the DOM with the values from the random poster object
  document.getElementById('poster-quote').textContent = newPoster.quote;
  document.getElementById('poster-title').textContent = newPoster.title;
  document.getElementById('poster-image').src = newPoster.image;
}

// Function to generate a custom poster
function generateCustomPoster(event) {
  event.preventDefault();

  let customQuote = document.getElementById('poster-form-quote').value;
  let customTitle = document.getElementById('poster-form-title').value;
  let customImage = document.getElementById('poster-form-image').value;

  let customPoster = {
    image: customImage,
    title: customTitle,
    quote: customQuote
  };

  posters.push(customPoster);

  document.getElementById('poster-quote').textContent = customQuote;
  document.getElementById('poster-title').textContent = customTitle;
  document.getElementById('poster-image').src = customImage;
}

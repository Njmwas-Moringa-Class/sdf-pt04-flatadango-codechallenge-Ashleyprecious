// Your code here
// Use of event listeners
document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = "http://localhost:3000"; //URL
    let availableTickets = 0; // Initialize the available tickets variable.
  
    // Function to fetch movie details and update the UI
    const fetchAndDisplayMovieDetails = async (filmsId) => { //Define asynchronous functions using async
      try {
        const response = await fetch(`${BASE_URL}/films/${filmsId}`); //Fetch URL response
        //Handle errors when fetching data an API
        if (!response.ok) { 
          throw new Error("Failed to fetch movie details.");
        }
        const filmData = await response.json();// extract the JSON data from the response object
        const {  //destructuring assignment to extract the values of these properties
          title,
          runtime,
          showtime,
          capacity,
          tickets_sold,
          description,
          poster,
        } = filmData;
  
        // Calculate available tickets
        availableTickets = capacity - tickets_sold; // Update availableTickets
  
        // Update the DOM elements with movie details
        document.getElementById("poster").src = poster; //set the src attribute of an HTML img element with the id of poster
        document.getElementById("title").textContent = title; //set the text content of an HTML element with the id of title
        document.getElementById("runtime").textContent = `${runtime} minutes`; //set the text content of an HTML element with the id of runtime
        document.getElementById("showtime").textContent = showtime;// set the text content of an HTML element with the id of showtime
        document.getElementById("ticket-num").textContent = availableTickets; // Update available tickets
        document.getElementById("film-info").textContent = description; //set the text content of an HTML element with the id of film-info
        //handle errors that occur when fetching data from an API
    } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
  
    // Function to update available tickets and handle ticket purchase
    const updateAvailableTickets = () => {
      // Update the number of available tickets in the DOM
      document.getElementById("ticket-num").textContent = availableTickets;
  
      //If statement to Disable the "Buy Ticket" button if no tickets are available
      const buyButton = document.getElementById("buy-ticket");
      if (availableTickets === 0) {
        buyButton.disabled = true;
      } else {
        buyButton.disabled = false;
      }
    };
  
    // Function to replicate a ticket purchase
    const buyTicket = async () => {  //define an asynchronous function
      try {
        if (availableTickets > 0) {
          // Replicate a ticket purchase (no persistence)
          availableTickets -= 1;
  
          // Update available tickets on the web page
          updateAvailableTickets();
  
          // Replicate updating the server ;make an API call
          const newTicketsSold = capacity - availableTickets;
  
          // Replicate a successful purchase
          setTimeout(() => {
            // Replicate updating the server (in reality, you would make an API call)
            filmData.tickets_sold = newTicketsSold;
  
            // Update the server data (not persisted in this example)
            // You would typically make an API call to update the server data here
            // Example: fetch(${BASE_URL}/films/${filmsId}, {
            //   method: 'PUT', // or 'POST' depending on your API design
            //   body: JSON.stringify({ tickets_sold: newTicketsSold }),
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            // });
          }, 1000);
        }
         //handle errors that occur when fetching data from an API
      } catch (error) {
        console.error("Error purchasing ticket:", error);
      }
    };
  
    // Function to populate the movie list
    const populateMovieList = async () => {
      try {
        const filmsList = document.getElementById("films");
        const response = await fetch(`${BASE_URL}/films`);
        if (!response.ok) {
          throw new Error("Failed to fetch movie list.");
        }
        const films = await response.json();
        // create a list of films and add event listeners to each film item
        films.forEach((film) => {
          const li = document.createElement("li");
          li.textContent = film.title;
          li.classList.add("film-item");
          li.addEventListener("click", () => { //Click event listener
            fetchAndDisplayMovieDetails(film.id);
          });
          filmsList.appendChild(li); //append a new li element to an existing ul element with the id of filmsList
        });
        //handle errors that occur when fetching data from an API
      } catch (error) {
        console.error("Error fetching movie list:", error);
      }
    };
  
    // Remove the placeholder <li> element if it exists
    const placeholderLi = document.querySelector("#films > li");
    if (placeholderLi) {
      placeholderLi.remove();
    }
  
    // Call populate MovieList to fetch and display the list of movies
    populateMovieList();
  
    // Add a click event listener to the "Buy Ticket" button
    const buyButton = document.getElementById("buy-ticket");
    buyButton.addEventListener("click", () => {
      buyTicket();
    });
  
    // Fetch and display movie details for the first movie
    fetchAndDisplayMovieDetails(1);
  });
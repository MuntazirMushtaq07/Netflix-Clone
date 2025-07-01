// 🌟 Get HTML Elements by their IDs (all the movie rows and search bar)
let trendingDiv = document.getElementById("trending-row");
let scifiDiv = document.getElementById("scifi-row");
let dramaDiv = document.getElementById("drama-row");
let actionDiv = document.getElementById("action-row");
let romanceDiv = document.getElementById("romance-row");
let horrorDiv = document.getElementById("horror-row");
let comedyDiv = document.getElementById("comedy-row");
let animationDiv = document.getElementById("animation-row");
let thrillerDiv = document.getElementById("thriller-row");
let mysteryDiv = document.getElementById("mystery-row");
let adventureDiv = document.getElementById("adventure-row");
let historyDiv = document.getElementById("history-row");

let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

// ✅ Your TMDB API Key (Replace before uploading to GitHub)
let apiKey =  "YOUR API KEY"

// =====================================================================
// 🔄 Function to fetch movies from TMDB using any URL
// =====================================================================
async function fetchMoviesFromTMDB(url) {
  try {
    let response = await fetch(url); // Make HTTP request
    let data = await response.json(); // Convert response to JSON
    return data.results || [];       // Return movie array or empty list
  } catch (err) {
    console.error("API fetch error:", err); // Show error in console
    return [];
  }
}

// =====================================================================
// 🎬 Function to display movie cards inside the given container
// =====================================================================
function displayMovies(movies, container) {
  container.innerHTML = ""; // Clear previous content

  if (movies.length === 0) {
    container.innerHTML = "<p>No movies found.</p>";
    return;
  }

  // ✅ Loop through movies and create a movie card for each
  movies.forEach(movie => {
    let card = document.createElement("div");
    card.className = "movie-card";

    // ✅ When card is clicked, save movie ID and go to details page
    card.onclick = function () {
      localStorage.setItem("selectedMovieId", movie.id);
      window.location.href = "details.html";
    };

    // ✅ If movie has poster, show it; else use placeholder
    let poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : "https://via.placeholder.com/150";

    // ✅ Use movie title or default
    let title = movie.title || "Untitled";

    // ✅ Insert image and title inside the card
    card.innerHTML = `
      <img src="${poster}" alt="${title}">
      <h4>${title}</h4>
    `;

    // ✅ Add styling inline (can also move this to CSS)
    card.style.margin = "10px";
    card.style.textAlign = "center";
    card.style.flex = "0 0 auto"; // Required for horizontal scrolling

    // ✅ Add card to its container (ex: trending-row)
    container.appendChild(card);
  });
}

// =====================================================================
// 🚀 Load Trending Movies on Home Page
// =====================================================================
async function loadTrendingMovies() {
  let url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
  let movies = await fetchMoviesFromTMDB(url);
  displayMovies(movies, trendingDiv);
}

// =====================================================================
// 🎭 Load Movies by Genre ID (Reusable for all genres)
// =====================================================================
async function loadGenreMovies(genreId, container) {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;
  let movies = await fetchMoviesFromTMDB(url);
  displayMovies(movies, container);
}

// =====================================================================
// 🔍 Search Bar - Save query and go to search page
// =====================================================================
searchBtn.addEventListener("click", function () {
  let query = searchInput.value.trim();

  if (query === "") {
    alert("Please enter a movie name");
    return;
  }

  localStorage.setItem("searchQuery", query);   // Save the search term
  window.location.href = "search.html";         // Navigate to search results page
});

// =====================================================================
// 🔄 Load All Sections on Page Load
// =====================================================================
loadTrendingMovies();                // 🔥 Trending

// 🎬 Genre-Based Rows (You can modify/add more)
loadGenreMovies(878, scifiDiv);      // 👽 Sci-Fi
loadGenreMovies(18, dramaDiv);       // 😭 Drama
loadGenreMovies(28, actionDiv);      // 💥 Action
loadGenreMovies(10749, romanceDiv);  // 💕 Romance
loadGenreMovies(27, horrorDiv);      // 😱 Horror
loadGenreMovies(35, comedyDiv);      // 🤣 Comedy
loadGenreMovies(16, animationDiv);   // 🎨 Animation
loadGenreMovies(53, thrillerDiv);    // 😮 Thriller
loadGenreMovies(9648, mysteryDiv);   // 🕵 Mystery
loadGenreMovies(12, adventureDiv);   // ⚔️ Adventure
loadGenreMovies(36, historyDiv);     // 📜 History

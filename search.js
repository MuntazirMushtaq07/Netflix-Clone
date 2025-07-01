// ✅ Your TMDB API Key (IMPORTANT: Replace with your own or load from .env in production)
let apiKey =  "YOUR API KEY"

// ✅ Get DOM elements for search input, button, and results container
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let searchResults = document.getElementById("search-results");

// =====================================================================
// 🔄 STEP 1: Load previous query from localStorage (if coming from home)
// =====================================================================
let query = localStorage.getItem("searchQuery") || ""; // Use empty if nothing found

// ✅ Show that query in the input field
searchInput.value = query;

// ✅ If a query exists (user came from home page), trigger fetch
if (query) {
  fetchSearchResults(query);
}

// =====================================================================
// 🔍 STEP 2: Function to Fetch Movie Search Results from TMDB
// =====================================================================
async function fetchSearchResults(query) {
  // ✅ Create search API URL
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

  try {
    // ✅ Fetch from TMDB and convert response to JSON
    let res = await fetch(url);
    let data = await res.json();

    // ✅ If no results found
    if (!data.results || data.results.length === 0) {
      searchResults.innerHTML = "<p>No movies found.</p>";
    } else {
      // ✅ If results are found, display them on page
      displayMovies(data.results);
    }
  } catch (err) {
    // ❌ If fetch fails or network error
    console.error("Search error:", err);
    searchResults.innerHTML = "<p>Failed to load results.</p>";
  }
}

// =====================================================================
// 🧱 STEP 3: Display Each Movie in Grid (Card layout)
// =====================================================================
function displayMovies(movies) {
  // ✅ Clear previous results
  searchResults.innerHTML = "";

  // ✅ Loop through each movie result
  movies.forEach(movie => {
    // ✅ Create movie card div
    let card = document.createElement("div");
    card.className = "search-card";

    // ✅ Build movie poster URL (fallback if missing)
    let poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";

    // ✅ Set the content (image + title)
    card.innerHTML = `
      <img src="${poster}" alt="${movie.title}" />
      <h4>${movie.title}</h4>
    `;

    // ✅ When user clicks a card → save ID → go to details page
    card.onclick = function () {
      localStorage.setItem("selectedMovieId", movie.id);
      window.location.href = "details.html";
    };

    // ✅ Add card to results container
    searchResults.appendChild(card);
  });
}

// =====================================================================
// 🔁 STEP 4: When Search Button is Clicked
// =====================================================================
searchBtn.addEventListener("click", () => {
  // ✅ Get typed value and clean spaces
  let newQuery = searchInput.value.trim();

  // ✅ If user entered a value, save it and fetch
  if (newQuery) {
    localStorage.setItem("searchQuery", newQuery); // Save query
    fetchSearchResults(newQuery);                 // Fetch results
  }
});

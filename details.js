// ✅ Get the container where movie details will be displayed
let container = document.getElementById("movie-details");

// ✅ Get the movie ID from localStorage (set when user clicks a movie)
let movieId = localStorage.getItem("selectedMovieId");

// ✅ TMDB API Key (replace with your own key or store externally)
let apiKey =  "YOUR API KEY"

// =================================================================
// 🔽 Function to fetch detailed info about a single movie
// =================================================================
async function fetchMovieDetails() {
  // ✅ API endpoint for movie details using dynamic movie ID
  let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  try {
    // ✅ Make API request and parse JSON response
    let res = await fetch(url);
    let data = await res.json();

    // ✅ Inject movie data into the container with HTML template
    container.innerHTML = `
      <h2>${data.title} (${data.release_date.slice(0, 4)})</h2>
      <img src="https://image.tmdb.org/t/p/w300${data.poster_path}" />
      <p><strong>Tagline:</strong> ${data.tagline || "N/A"}</p>
      <p><strong>Genres:</strong> ${data.genres.map(g => g.name).join(", ")}</p>
      <p><strong>Overview:</strong> ${data.overview}</p>
      <p><strong>Runtime:</strong> ${data.runtime} minutes</p>
      <p><strong>Rating:</strong> ⭐ ${data.vote_average} (${data.vote_count} votes)</p>
      <p><strong>Language:</strong> ${data.original_language.toUpperCase()}</p>
      <p><strong>Status:</strong> ${data.status}</p>
      <p><strong>Budget:</strong> $${data.budget.toLocaleString()}</p>
      <p><strong>Revenue:</strong> $${data.revenue.toLocaleString()}</p>
      <p><strong>Homepage:</strong> <a href="${data.homepage}" target="_blank">${data.homepage}</a></p>
      <p><strong>Production:</strong> ${data.production_companies.map(p => p.name).join(", ")}</p>
    `;

  } catch (err) {
    // ❌ Handle errors if API fails
    container.innerHTML = `<p>Failed to load movie details.</p>`;
  }
}

// =================================================================
// 🔽 Function to fetch cast & crew for the movie
// =================================================================
async function fetchCastAndCrew(movieId) {
  // ✅ TMDB endpoint to get credits (cast + crew) for movie
  let url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

  try {
    // ✅ Make request and parse JSON
    let res = await fetch(url);
    let data = await res.json();

    // ✅ Get top 5 actors from cast
    let topCast = data.cast.slice(0, 5);

    // ✅ Find the director from the crew list
    let director = data.crew.find(member => member.job === "Director");

    // ✅ Start HTML for cast list
    let castHtml = `<h3>Top Cast:</h3><ul>`;

    // ✅ Loop through top 5 cast members and create list items
    topCast.forEach(actor => {
      // ✅ Set image (fallback if not available)
      let actorImg = actor.profile_path
        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
        : "https://via.placeholder.com/100";

      // ✅ Add actor name and character to the list
      castHtml += `
        <li>
          <img src="${actorImg}" width="50" />
          ${actor.name} as ${actor.character}
        </li>`;
    });

    // ✅ Close the unordered list
    castHtml += `</ul>`;

    // ✅ Add director info (optional chaining for safety)
    let directorHtml = `<p><strong>Director:</strong> ${director?.name || "Unknown"}</p>`;

    // ✅ Append director and cast info below movie details
    container.innerHTML += directorHtml + castHtml;

  } catch (err) {
    // ❌ Handle errors in cast/crew fetch
    console.error("Failed to fetch cast:", err);
  }
}

// ✅ Call both functions to load on page
fetchMovieDetails();
fetchCastAndCrew(movieId);

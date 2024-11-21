const apiUrl = "https://api.collectapi.com/imdb/imdbSearchByName?query=avengers";
const apiKey = "apikey 3PHr5qGq337arQu1TXdLmT:68kY6OGU3D1xD9i7Oxzepp";

function fetchMovies() {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        displayMovies(response.result);
      } else {
        console.error(`Erro ao buscar dados: ${xhr.status}`);
      }
    }
  };

  xhr.open("GET", apiUrl);
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("authorization", apiKey);
  
  xhr.send(null);
}

function displayMovies(movies) {
    const movieContainer = document.getElementById("movies");
  
    if (!movies || movies.length === 0) {
      movieContainer.innerHTML = `
        <div class="alert alert-warning" role="alert">
          Nenhum filme encontrado.
        </div>
      `;
      return;
    }
  
    movieContainer.innerHTML = movies.map(movie => {
      const movieLink = `https://www.imdb.com/title/${movie.imdbID}`;
      const movieImage = movie.Poster ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image";
      const movieTitle = movie.Title ? movie.Title : "Título não disponível";
      const movieYear = movie.Year ? `(${movie.Year})` : "";
  
      return `
        <div class="col-md-4 col-sm-6">
          <div class="card">
            <a href="${movieLink}" target="_blank">
              <img src="${movieImage}" class="card-img-top" alt="${movieTitle}">
            </a>
            <div class="card-body">
              <h5 class="card-title">${movieTitle} ${movieYear}</h5>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }
   

fetchMovies();

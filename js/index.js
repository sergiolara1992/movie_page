const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "bd81ac605f13a9bee278476a26a7f387";

document.addEventListener("DOMContentLoaded", async () => {
  await renderNewsMovies();
  await renderListMovies();
  await renderTopRatedMovies();
});

const getMovies = async () => {
  try {
    const url = `${URL_PATH}/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
    const response = await fetch(url);
    const result = await response.json();
    return result.results;
  } catch (error) {
    console.log(error);
  }
};

const generateMovieHTML = (movie) => {
  const { id, title, poster_path } = movie;
  const movieCover = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const urlMovie = `../movie.html?id=${id}`;

  return `
    <li class="list-group-item">
      <img src="${movieCover}" alt="${title}">
      <h3>${title}</h3>
      <a href="${urlMovie}" class="btn btn-primary">Ver Más</a>
    </li>
  `;
};

const renderNewsMovies = async () => {
  const newMovies = await getMovies();
  const html = newMovies
    .map((movie, index) => {
      const { title, overview, backdrop_path } = movie;
      const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
      const urlMovie = `../movie.html?id=${movie.id}`;

      return `
      <div class="carousel-item ${
        index === 0 ? "active" : ""
      }" style="background-image: url('${urlImage}')">
        <div class="carousel-caption">
          <h5>${title}</h5>
          <p>${overview}</p>
          <a href="${urlMovie}" class="btn btn-primary">Más Informacion</a>
        </div>
      </div>
    `;
    })
    .join("");

  const carouselControls = `
    <a class="carousel-control-prev" href="#carousel-news-movies" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Anterior</span>
    </a>
    <a class="carousel-control-next" href="#carousel-news-movies" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Siguiente</span>
    </a>
  `;

  document.getElementsByClassName("list-news-movies")[0].innerHTML =
    html + carouselControls;
};

const renderListMovies = async () => {
  const movies = await getMovies();
  const html = movies.slice(0, 5).map(generateMovieHTML).join("");


  document.getElementsByClassName("now-playing__list")[0].innerHTML = html;
};

const getTopRatedMovies = async () => {
  try {
    const url = `${URL_PATH}/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
    const response = await fetch(url);
    const result = await response.json();
    return result.results;
  } catch (error) {
    console.log(error);
  }
};

const renderTopRatedMovies = async () => {
  const movies = await getTopRatedMovies();
  const html = movies.slice(0, 5).map(generateMovieHTML).join("");

  document.getElementsByClassName("top-rated-playing__list")[0].innerHTML =
    html;
};

const apiKey = "ebc5cc8c";
const minSearchLength = 4;
const noImageUrl = "./assets/no-img.jpg";

const styles = `
  :root {
    font-family: Arial, Helvetica, sans-serif;
    color: #1f2933;
    background: #f5f7fb;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    padding: 40px 16px;
  }

  .container {
    width: min(1100px, 100%);
    margin: 0 auto;
  }

  h1 {
    margin: 0 0 24px;
    text-align: center;
    font-size: 40px;
    color: #111827;
  }

  .controls {
    display: grid;
    gap: 14px;
    width: min(560px, 100%);
    margin: 0 auto 32px;
  }

  .search-input {
    display: block;
    width: 100%;
    padding: 14px 18px;
    border: 1px solid #d5dce8;
    border-radius: 8px;
    background: #ffffff;
    color: #111827;
    font-size: 18px;
    outline: none;
    box-shadow: 0 8px 20px rgba(31, 41, 55, 0.08);
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  }

  .search-input:hover {
    border-color: #8aa4d6;
    transform: translateY(-1px);
  }

  .search-input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.14);
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    color: #4b5563;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
  }

  .checkbox-label input {
    width: 16px;
    height: 16px;
    accent-color: #2563eb;
    cursor: pointer;
  }

  .message {
    margin: 0 0 18px;
    text-align: center;
    color: #596575;
    font-size: 15px;
  }

  .results {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: 20px;
  }

  .movie-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 14px;
    border: 1px solid #e1e6ef;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 10px 24px rgba(31, 41, 55, 0.08);
    overflow: hidden;
    transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
  }

  .movie-card:hover {
    border-color: #b7c7e3;
    box-shadow: 0 16px 34px rgba(31, 41, 55, 0.16);
    transform: translateY(-6px);
  }

  .movie-card h2 {
    margin: 0;
    font-size: 18px;
    line-height: 1.25;
    color: #111827;
  }

  .movie-card p {
    margin: 0;
    color: #596575;
    font-size: 14px;
  }

  .movie-poster {
    width: 100%;
    aspect-ratio: 2 / 3;
    margin-top: auto;
    border-radius: 6px;
    object-fit: cover;
    background: #e8edf5;
    transition: transform 0.25s, filter 0.25s;
  }

  .movie-card:hover .movie-poster {
    filter: saturate(1.08) contrast(1.04);
    transform: scale(1.03);
  }

  .load-more {
    display: block;
    margin: 28px auto 0;
    padding: 12px 22px;
    border: 0;
    border-radius: 8px;
    background: #2563eb;
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.22);
    transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  }

  .load-more:hover {
    background: #1d4ed8;
    box-shadow: 0 14px 30px rgba(37, 99, 235, 0.3);
    transform: translateY(-2px);
  }

  .load-more:disabled {
    background: #9ca3af;
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
  }

  .load-more.is-hidden {
    display: none;
  }

  @media (max-width: 560px) {
    .app {
      padding: 28px 12px;
    }

    h1 {
      font-size: 32px;
    }

    .results {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 14px;
    }
  }
`;

const app = document.createElement("div");
const container = document.createElement("div");
const controls = document.createElement("div");
const title = document.createElement("h1");
const search = document.createElement("input");
const checkboxLabel = document.createElement("label");
const clearCheckbox = document.createElement("input");
const message = document.createElement("p");
const results = document.createElement("div");
const loadMoreButton = document.createElement("button");

let shouldClearBeforeSearch = true;
let lastSearchValue = "";
let currentSearchValue = "";
let currentPage = 1;
let totalResults = 0;
let currentResultsCount = 0;
let isLoading = false;

const debounce = (() => {
  let timerId = null;

  return (callback, delay) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(callback, delay);
  };
})();

function addStyles() {
  const style = document.createElement("style");
  style.textContent = styles;
  document.head.append(style);
}

function createMovieApp() {
  title.textContent = "Movie Search";

  search.type = "text";
  search.classList.add("search-input");
  search.placeholder = "Enter movie title";

  clearCheckbox.type = "checkbox";
  clearCheckbox.checked = shouldClearBeforeSearch;
  checkboxLabel.classList.add("checkbox-label");
  checkboxLabel.append(clearCheckbox, "Clear previous results");

  app.classList.add("app");
  container.classList.add("container");
  controls.classList.add("controls");
  message.classList.add("message");
  results.classList.add("results");
  results.id = "results";
  loadMoreButton.type = "button";
  loadMoreButton.textContent = "Load more";
  loadMoreButton.classList.add("load-more", "is-hidden");

  app.append(container);
  controls.append(search, checkboxLabel);
  container.append(title, controls, message, results, loadMoreButton);
  document.body.append(app);
}

function clearMoviesMarkup() {
  results.innerHTML = "";
}

function setMessage(text = "") {
  message.textContent = text;
}

function updateLoadMoreButton() {
  const hasMoreResults = currentResultsCount < totalResults;

  loadMoreButton.classList.toggle("is-hidden", !hasMoreResults || !currentSearchValue);
  loadMoreButton.disabled = isLoading;
}

async function getData(searchValue, page = 1) {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchValue)}&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.Response !== "True" || !data.Search) {
    throw new Error(data.Error || "Movies not found");
  }

  return {
    movies: data.Search,
    totalResults: Number(data.totalResults) || data.Search.length,
  };
}

function addMovieToList({ Poster: poster, Title: title, Year: year, Type: type }) {
  const card = document.createElement("div");
  const movieTitle = document.createElement("h2");
  const movieYear = document.createElement("p");
  const movieType = document.createElement("p");
  const image = document.createElement("img");
  const hasPosterUrl = /^https?:\/\//.test(poster);

  card.classList.add("movie-card");
  image.classList.add("movie-poster");

  movieTitle.textContent = title;
  movieYear.textContent = `Year: ${year}`;
  movieType.textContent = `Type: ${type}`;
  image.src = hasPosterUrl ? poster : noImageUrl;
  image.alt = `${title} ${year}`;
  image.title = `${title} ${year}`;
  image.onerror = () => {
    image.onerror = null;
    image.src = noImageUrl;
  };

  card.append(movieTitle, movieYear, movieType, image);
  results.append(card);
}

function inputSearchHandler(event) {
  debounce(async () => {
    const searchValue = event.target.value.trim();

    if (!searchValue) {
      clearMoviesMarkup();
      setMessage("");
      lastSearchValue = "";
      currentSearchValue = "";
      currentPage = 1;
      totalResults = 0;
      currentResultsCount = 0;
      updateLoadMoreButton();
      return;
    }

    if (searchValue.length < minSearchLength) {
      setMessage(`Type at least ${minSearchLength} characters`);
      currentSearchValue = "";
      totalResults = 0;
      currentResultsCount = 0;
      updateLoadMoreButton();
      return;
    }

    if (lastSearchValue === searchValue) {
      return;
    }

    if (shouldClearBeforeSearch) {
      clearMoviesMarkup();
    }

    currentSearchValue = searchValue;
    currentPage = 1;
    totalResults = 0;
    currentResultsCount = 0;
    isLoading = true;
    updateLoadMoreButton();
    setMessage("Searching...");

    try {
      const result = await getData(searchValue, currentPage);
      const movies = result.movies;

      totalResults = result.totalResults;
      currentResultsCount = movies.length;
      movies.forEach(addMovieToList);
      setMessage("");
    } catch (error) {
      clearMoviesMarkup();
      currentSearchValue = "";
      totalResults = 0;
      currentResultsCount = 0;
      setMessage(error.message);
    } finally {
      isLoading = false;
      updateLoadMoreButton();
    }

    lastSearchValue = searchValue;
  }, 1000);
}

async function loadMoreMovies() {
  if (!currentSearchValue || isLoading) {
    return;
  }

  isLoading = true;
  currentPage += 1;
  loadMoreButton.textContent = "Loading...";
  updateLoadMoreButton();
  setMessage("");

  try {
    const result = await getData(currentSearchValue, currentPage);

    totalResults = result.totalResults;
    currentResultsCount += result.movies.length;
    result.movies.forEach(addMovieToList);
  } catch (error) {
    currentPage -= 1;
    setMessage(error.message);
  } finally {
    isLoading = false;
    loadMoreButton.textContent = "Load more";
    updateLoadMoreButton();
  }
}

search.addEventListener("input", inputSearchHandler);
clearCheckbox.addEventListener("change", (event) => {
  shouldClearBeforeSearch = event.target.checked;
});
loadMoreButton.addEventListener("click", loadMoreMovies);

addStyles();
createMovieApp();

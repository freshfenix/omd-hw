const apiKey = "ebc5cc8c";
const minSearchLength = 4;
const noImageUrl = "/assets/no-img.jpg";

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

let shouldClearBeforeSearch = true;
let lastSearchValue = "";

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

  app.append(container);
  controls.append(search, checkboxLabel);
  container.append(title, controls, message, results);
  document.body.append(app);
}

function clearMoviesMarkup() {
  results.innerHTML = "";
}

function setMessage(text = "") {
  message.textContent = text;
}

async function getData(searchValue) {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchValue)}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.Response !== "True" || !data.Search) {
    throw new Error(data.Error || "Movies not found");
  }

  return data.Search;
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
  results.prepend(card);
}

function inputSearchHandler(event) {
  debounce(async () => {
    const searchValue = event.target.value.trim();

    if (!searchValue) {
      clearMoviesMarkup();
      setMessage("");
      lastSearchValue = "";
      return;
    }

    if (searchValue.length < minSearchLength) {
      setMessage(`Type at least ${minSearchLength} characters`);
      return;
    }

    if (lastSearchValue === searchValue) {
      return;
    }

    if (shouldClearBeforeSearch) {
      clearMoviesMarkup();
    }

    setMessage("Searching...");

    try {
      const movies = await getData(searchValue);
      movies.forEach(addMovieToList);
      setMessage("");
    } catch (error) {
      clearMoviesMarkup();
      setMessage(error.message);
    }

    lastSearchValue = searchValue;
  }, 1000);
}

search.addEventListener("input", inputSearchHandler);
clearCheckbox.addEventListener("change", (event) => {
  shouldClearBeforeSearch = event.target.checked;
});

addStyles();
createMovieApp();

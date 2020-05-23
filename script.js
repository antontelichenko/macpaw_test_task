document.getElementById('categories').hidden = true;
document.getElementById('searchBox').hidden = true;

let radioValue = 'random';
let selectedCategory = '';
let searchValue = '';
let allTheCategories;
let favoriteJokes =
  JSON.parse(localStorage.getItem('favoriteJokes')) === null
    ? []
    : JSON.parse(localStorage.getItem('favoriteJokes'));
if (favoriteJokes !== []) {
  let favoriteJokesInHtml = '';
  favoriteJokes.map(joke => {
    favoriteJokesInHtml += getPatternJoke(joke, true);
  });
  let favoriteJokesContainer = document.querySelector(
    '.favorite-jokes-container'
  );
  favoriteJokesContainer.innerHTML = favoriteJokesInHtml;
}
let joke = favoriteJokes;
function getPatternJoke(joke, isFavorite) {
  console.log(joke);
  if (joke['search.query']) {
    console.log();
    return `<div class="joke">
    <p>${joke['search.query']}</p>
  </div>`;
  }
  if (joke.result) {
    console.log(joke);
    let jokesInHtml = '';

    joke.result.map(joke => {
      console.log(joke);
      jokesInHtml += getPatternJoke(joke);
      console.log(jokesInHtml);
    });
    console.log(jokesInHtml);
    return jokesInHtml;
  }
  return `
    <div class=${isFavorite ? 'favorite-joke' : 'joke'} id="${joke.id}">
      <div class=${isFavorite ? 'favorite-background-icon' : 'background-icon'}>
        <img src="img/message.svg" alt="" class="icon">
      </div>
      <div class=${isFavorite ? 'favorite-text-wrapper' : 'text-wrapper'}>
        <div class="end">
          <div class="like-wrapper">
            <i onclick="toggleJokeStatus('${joke.id}')" id="favoriteButton">
    ${
      favoriteJokes.find(localJoke => localJoke.id === joke.id) === undefined
        ? '<i class="demo-icon icon-unlike">&#xe800;</i>'
        : '<i class="demo-icon icon-liked">&#xe801;</i>'
    }
            </i>
          </div>
        </div>
        <span class="link">
          ID: 
          <a target="_blank" href="https://api.chucknorris.io/jokes/${joke.id}">
          ${joke.id}
          </a>
        </span>
        <p class="joke-text">${joke.value}</p>
        <div class="joke-footer">
        <p>Last update: ${(
          (Date.now() - Date.parse(joke.updated_at)) /
          60000000
        ).toFixed()} hours ago</p>
            <p class="joke-category">${
              joke.categories.length > 0 ? joke.categories[0] : ''
            }</p>
        </div>
      </div>
    </div>`;
}
function toggleJokeStatus(id) {
  let singleJoke = joke;
  if (singleJoke.result) {
    singleJoke = singleJoke.result.find(localJoke => localJoke.id === id);
  }
  console.log(id);
  let jokeContainer = document.getElementById('jokeContainer');
  let exists = favoriteJokes.find(localJoke => localJoke.id === id);
  console.log(exists);
  if (exists === undefined) {
    console.log('no element in favoriteJokes');
    console.log(singleJoke);
    favoriteJokes.push(singleJoke);
    jokeContainer.innerHTML = getPatternJoke(joke);
  } else {
    favoriteJokes = favoriteJokes.filter(localJoke => localJoke.id !== id);
    if (singleJoke) {
      if (singleJoke.id === id) {
        jokeContainer.innerHTML = getPatternJoke(joke);
      }
    }
  }
  let stringifiedJoke = JSON.stringify(favoriteJokes);
  localStorage.setItem('favoriteJokes', stringifiedJoke);
  let favoriteJokesInHtml = '';
  favoriteJokes.map(singleJoke => {
    favoriteJokesInHtml += getPatternJoke(singleJoke, true);
  });
  let favoriteJokesContainer = document.querySelector(
    '.favorite-jokes-container'
  );
  favoriteJokesContainer.innerHTML = favoriteJokesInHtml;
  console.log(favoriteJokes);
}

switchCategory = category => {
  selectedCategory = category;
  let categoriesInHtml = '';
  allTheCategories.map(category => {
    let pattern = `<a href="#" onclick="switchCategory('${category}')" class="category ${category ===
      selectedCategory && 'selected-category'}">
    ${category}
  </a>`;
    categoriesInHtml += pattern;
  });

  let categories = document.getElementById('categories');
  categories.innerHTML = categoriesInHtml;
};

saveSearchValue = e => {
  searchValue = e;
};

const fetchCategories = async () => {
  const response = await fetch('https://api.chucknorris.io/jokes/categories');
  const json = await response.json();
  allTheCategories = json;
  let categoriesInHtml = '';
  json.map(category => {
    let pattern = `<a href="#" onclick="switchCategory('${category}')" class="category">
    ${category}
  </a>`;
    categoriesInHtml += pattern;
  });

  let categories = document.getElementById('categories');
  categories.innerHTML = categoriesInHtml;
};

async function toggleRadio(e) {
  radioValue = e;
  if (radioValue === 'random') {
    console.log('test1');
    document.getElementById('categories').hidden = true;
    document.getElementById('searchBox').hidden = true;
  }

  if (radioValue === 'category') {
    console.log('test2');
    await fetchCategories();
    document.getElementById('categories').hidden = false;
    document.getElementById('searchBox').hidden = true;
  }

  if (radioValue === 'search') {
    console.log('test3');
    document.getElementById('categories').hidden = true;
    document.getElementById('searchBox').hidden = false;
  }

  console.log(e);
}

async function searchJoke() {
  if (radioValue === 'random') {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const json = await response.json();
    joke = json.error ? json.violations : json;
  } else if (radioValue === 'category') {
    const response = await fetch(
      'https://api.chucknorris.io/jokes/random?category=' + selectedCategory
    );
    const json = await response.json();
    console.log(json);
    joke = json.error ? json.violations : json;
  } else if (radioValue === 'search') {
    console.log(`https://api.chucknorris.io/jokes/search?query=${searchValue}`);
    const response = await fetch(
      `https://api.chucknorris.io/jokes/search?query=${searchValue}`
    );
    const json = await response.json();
    console.log(json);
    joke = json.error ? json.violations : json;
  }
  let jokeObject = getPatternJoke(joke);
  let jokeContainer = document.getElementById('jokeContainer');
  jokeContainer.innerHTML = jokeObject;
}

openFavouriteJokes = status => {
  if (status) {
    document.querySelector('.sidebar').style.display = 'flex';
    document.body.clientWidth >= 794 &&
      (document.querySelector('.overlay').style.display = 'block');
  } else {
    document.querySelector('.sidebar').style.display = 'none';
    document.body.clientWidth >= 794 &&
      (document.querySelector('.overlay').style.display = 'none');
  }
};

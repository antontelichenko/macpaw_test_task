let favoriteJokes = [
  {
    categories: ['money'],
    created_at: '2020-01-05 13:42:26.766831',
    icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
    id: 'l7U9EO5rTlyvCc9WIJALtw',
    updated_at: '2020-05-22 06:16:41.133769',
    url: 'https://api.chucknorris.io/jokes/l7U9EO5rTlyvCc9WIJALtw',
    value:
      "Chuck Norris is so money he's accepted at all highstreet retailers.",
  },
  {
    categories: [],
    created_at: '2020-01-05 13:42:24.142371',
    icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
    id: 'yPOlUeXaSxCoufON3iYMGw',
    updated_at: '2020-01-05 13:42:24.142371',
    url: 'https://api.chucknorris.io/jokes/yPOlUeXaSxCoufON3iYMGw',
    value: "Chuck Norris use's hand sanitizer as eye drops.",
  },
];
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
let joke = {
  categories: ['money'],
  created_at: '2020-01-05 13:42:26.766831',
  icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
  id: 'l7U9EO5rTlyvCc9WIJALtw',
  updated_at: '2020-05-22 06:16:41.133769',
  url: 'https://api.chucknorris.io/jokes/l7U9EO5rTlyvCc9WIJALtw',
  value: "Chuck Norris is so money he's accepted at all highstreet retailers.",
};
let jokeInHTML = `
    <div class=favorite-joke id="l7U9EO5rTlyvCc9WIJALtw">
      <div class=favorite-background-icon>
        <img src="img/message.svg" alt="" class="icon">
      </div>
      <div class=favorite-text-wrapper>
        <div class="end">
          <div class="like-wrapper">
            <i onclick="toggleJokeStatus('l7U9EO5rTlyvCc9WIJALtw')" id="favoriteButton">
    <i class="demo-icon icon-liked">&#xe801;</i>
            </i>
          </div>
        </div>
        <span class="link">
          ID: 
          <a target="_blank" href="https://api.chucknorris.io/jokes/l7U9EO5rTlyvCc9WIJALtw">
          l7U9EO5rTlyvCc9WIJALtw
          </a>
        </span>
        <p class="joke-text">Chuck Norris is so money he's accepted at all highstreet retailers.</p>
        <div class="joke-footer">
        <p>Last update: 2 hours ago</p>
            <p class="joke-category">money</p>
        </div>
      </div>
    </div>`;

describe('is getPatternJoke', () => {
  test(' joke in getPatternJoke', () => {
    expect(getPatternJoke(joke, true)).toBe(jokeInHTML);
  });
});

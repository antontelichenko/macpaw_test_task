const random = document.getElementById('random');
const fromCategories = document.getElementById('fromCategories');
const search = document.getElementById('search');
const searchBox = document.getElementById('searchBox');
// const sidebarButton = document.querySelector('.sidebarButton')
// let sidebarOpen = false;
const favouriteButton = document.getElementById('favouriteButtonn');
const sidebar = document.getElementById('sidebar');
const jokeBox = document.querySelector('joke');

document.getElementById('categories').hidden = true;
document.getElementById('searchBox').hidden = true;

random.onclick = function() {
  document.getElementById('categories').hidden = true;
  document.getElementById('searchBox').hidden = true;
};
console.log('test');
fromCategories.onclick = function() {
  document.getElementById('categories').hidden = false;
  document.getElementById('searchBox').hidden = true;
};

search.onclick = function() {
  document.getElementById('categories').hidden = true;
  document.getElementById('searchBox').hidden = false;
};

// sidebarButton.addEventListener('click', () => {
//   if(!sidebarOpen) {
//     sidebarButton.classList.add('open');
//     sidebarOpen = true;
//   } else {
//     sidebarButton.classList.remove('open')
//     sidebarOpen = false;
//   }
// })

function toggle() {
  if (favouriteButton.classList.contains('far')) {
    favouriteButton.classList.remove('far');
    favouriteButton.classList.add('fas');
    sidebar.appendChild(jokeBox);
  } else {
    favouriteButton.classList.remove('fas');
    favouriteButton.classList.add('far');
    sidebar.removeChild(jokeBox);
  }
}

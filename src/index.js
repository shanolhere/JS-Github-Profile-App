const text = document.querySelector(".text");
const checkBtn = document.querySelector(".check");
const main = document.querySelector(".main");

const APIURL = "https://api.github.com/users/";

checkBtn.addEventListener("click", () => {
  fetch(APIURL + text.value)
    .then((res) => {
      if (!res.ok) {
        alert("No such user found.");
      }
      return res.json();
    })
    .then((data) => {
      //console.log(data);
      const cardHTML = `
      <div class="card">
        <div class="card-image">
          <img src="${data.avatar_url}" alt="${data.name}" />
        </div>

        <div class="card-info">
          <h2 class="card-title">${data.name}</h2>
          <p class="card-para">${data.bio}</p>
          <ul>
            <li class="card-followers">${data.followers} <strong>Followers</strong></li>
            <li class="card-following">${data.following} <strong>Following</strong></li>
            <li class="card-repos">${data.public_repos} <strong>Repos</strong></li>
          </ul>
          <div class="repos"></div>
        </div>
      
    </div>
  `;

      main.innerHTML = cardHTML;

      getRepos(data["login"]);
    });
});

function getRepos(username) {
  fetch(APIURL + username + "/repos?sort=created")
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      addReposToCard(data);
    });
}

function addReposToCard(repos) {
  const reposEl = document.querySelector(".repos");

  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}

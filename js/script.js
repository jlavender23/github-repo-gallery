//This div is where your profile information will appear
const overview = document.querySelector(".overview");
const username = "jlavender23";
const repoList = document.querySelector(".repo-list");

const gitProfile = async function() {
    const userInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    console.log(data);
    displayUserInfo(data);
}

gitProfile();

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add(".user-info");
    div.innerHTML =
    `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> 
`;
    overview.append(div); //append the div to the overview element
    gitRepos();
};

const gitRepos = async function () {
    const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    console.log(repoData);
    repoDisplay(repoData);
};

const repoDisplay = function (repos) {//so that the function accepts the data returned from your last API call.
    for (const repo of repos) {
        const listItem = document.createElement("li");
        listItem.classList.add("repo");//created a li for each repo and gav each item a class of repo
        listItem.innerHTML = `<h3>${repo.name}</h3>`; // ...and gave an h3 element with the repo name
        repoList.append(listItem); //appeneded the li to the global variable
    }
};
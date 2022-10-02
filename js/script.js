//This div is where your profile information will appear
const overview = document.querySelector(".overview");
const username = "jlavender23";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");//where repo info appears
const individualRepo= document.querySelector(".repo-data");
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const gitProfile = async function() {
    const userInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
   // console.log(data);
    displayUserInfo(data);
};

gitProfile();

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
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
    //console.log(repoData);
    repoDisplay(repoData);
};

const repoDisplay = function (repos) {//so that the function accepts the data returned from your last API call.
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const listItem = document.createElement("li");
        listItem.classList.add("repo");//created a li for each repo and gav each item a class of repo
        listItem.innerHTML = `<h3>${repo.name}</h3>`; // ...and gave an h3 element with the repo name
        repoList.append(listItem); //appeneded the li to the global variable
    }
};


//ADD CLICK EVENT
repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {// to check if the event target(element clicked on) matches the h3 element
        const repoName = e.target.innerText;
        speceficRepo(repoName);
    }
});

//CREATE A FUNCTION TO GET SPECIFIC REPO INFO
const speceficRepo = async function (repoName) {
    const grabInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await grabInfo.json();//this is to resolve and save the JSON response
    //console.log(repoInfo);
    //grab languages
    const fetchLanguages = await fetch(repoInfo.languages_url); //to fetch data from language_url property of your repoInfo
    const languageData = await fetchLanguages.json(); //to save the JSON response.
    //console.log(languageData);
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    
    displaySpeceficRepo (repoInfo, languages);
};

const displaySpeceficRepo = function (repoInfo, languages) {
    individualRepo.innerHTML = ""; //empty the HTML of the section with a class of “repo-data” where the individual repo data will appear.
    individualRepo.classList.remove("hide");
    repoSection.classList.add("hide");
    backButton.classList.remove("hide");
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    individualRepo.append(div);
};

backButton.addEventListener("click", function(){
    repoSection.classList.remove("hide");
    individualRepo.classList.add("hide");
    backButton.classList.add("hide");
});


//dynamic search
filterInput.addEventListener("input", function(e){
    const searchValue= e.target.value;
    //console.log(searchValue);//shows what you type in console
    const repos = document.querySelectorAll(".repo");//selects all elements with a class of repo
    const searchLowerText = searchValue.toLowerCase();

    for(const repo of repos ){//looping through each repo of repos element
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes (searchLowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});


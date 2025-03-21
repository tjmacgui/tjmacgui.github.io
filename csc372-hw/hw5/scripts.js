document.addEventListener("DOMContentLoaded", () => {
    const defaultUser = "tjmacgui"; //my info
    const form = document.getElementById("search-form");
    const input = document.getElementById("search-input");
    const gallery = document.getElementById("gallery");
  
    //loads my info
    loadRepos(defaultUser);
  
    //search form
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      loadRepos(input.value);
    });
  
    async function loadRepos(username) {
      gallery.innerHTML = ""; //reset
  
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
      const repos = await reposRes.json();
  
      for (const repo of repos) {
        //100 is the max
        const commitsRes = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=100`);
        const commits = await commitsRes.json();
  
        //languages used
        const languagesRes = await fetch(repo.languages_url);
        const languages = await languagesRes.json();
  
        //each element block
        const card = document.createElement("div");
        card.className = "repo-card";
        card.innerHTML = `
          <h2>${repo.name}</h2>
          <p><strong>Description:</strong> ${repo.description || "None"}</p>
          <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
          <p><strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
          <p><strong>Commits:</strong> ${commits.length}</p>
          <p><strong>Languages:</strong> ${Object.keys(languages).join(", ") || "None"}</p>
          <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
          <p><a href="${repo.html_url}" target="_blank">View on GitHub</a></p>
        `;
  
        gallery.appendChild(card);
      }
    }
  });
  
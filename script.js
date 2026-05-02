const repoList = document.getElementById("repoList");

    if (!username) {
        alert("Masukkan username GitHub!");
        return;
    }

    repoList.innerHTML = "Loading...";

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();

        repoList.innerHTML = "";

        repos.forEach(repo => {
            const li = document.createElement("li");
            li.className = "repo-item";

            li.innerHTML = `
                <div class="repo-title">${repo.name}</div>
                <div class="repo-desc">${repo.description || "Tidak ada deskripsi"}</div>
            `;

            li.onclick = () => {
                openRepository(repo.html_url);
                loadReadme(username, repo.name);
            };

            repoList.appendChild(li);
        });

    } catch (error) {
        repoList.innerHTML = "Gagal mengambil repository.";
        console.error(error);
    }
}

function toggleList() {
    isHidden = !isHidden;

    if (isHidden) {
        repoContainer.style.display = "none";
        toggleBtn.innerText = "View List";
    } else {
        repoContainer.style.display = "block";
        toggleBtn.innerText = "Hide List";
    }
}

function openRepository(url) {
    window.open(url, "_blank");
}

async function loadReadme(username, repoName) {
    try {
        const response = await fetch(
            `https://raw.githubusercontent.com/${username}/${repoName}/main/README.md`
        );

        if (!response.ok) {
            readmeContent.innerText = "README.md tidak ditemukan.";
            return;
        }

        const text = await response.text();
        readmeContent.innerText = text;

    } catch (error) {
        readmeContent.innerText = "Gagal mengambil README.md";
        console.error(error);
    }
}

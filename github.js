export async function loadGitHubProjects(username) {
  const container = document.getElementById('github-projects');
  if (!container) return;

  try {
    // Busca repositórios públicos ordenados por atualização
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    
    if (!response.ok) throw new Error('Erro ao carregar dados do GitHub');

    const repos = await response.json();

    container.innerHTML = repos
      .filter(repo => !repo.fork && repo.description) 
      .slice(0, 6) 
      .map(repo => {
        return `
          <div class="project-card">
            <h3>${repo.name.replace(/-/g, ' ')}</h3>
            <p>${repo.description}</p>
            <div class="project-links">
              <a href="${repo.html_url}" target="_blank" data-i18n="view-repo">
                Ver Repositório
              </a>
              ${repo.homepage ? `
                <a href="${repo.homepage}" target="_blank" data-i18n="view-online">
                  Ver Online
                </a>` : ''}
            </div>
          </div>
        `;
      })
      .join('');

    // Dica: Se você tiver uma função de tradução no main.js, 
    // chame-a aqui para traduzir os botões injetados.
  } catch (error) {
    console.error('GitHub API Error:', error);
    container.innerHTML = '<p>Não foi possível carregar os projetos no momento.</p>';
  }
}
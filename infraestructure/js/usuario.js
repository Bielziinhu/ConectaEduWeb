document.addEventListener("DOMContentLoaded", () => {
    obterUsername();
});

function obterUsername() {
    const authToken = localStorage.getItem('authToken');
    const UserEndpoint = 'http://localhost:8080/conecta-edu/v1/usuarios/me';

    if (!authToken) {
        console.error("Token de autenticação não encontrado no localStorage.");
        document.getElementById('username-display').textContent = "Token ausente";
        return;
    }

    fetch(UserEndpoint, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao buscar o nome do usuário: ${response.status} ${response.statusText}`);
        }
        return response.text(); // Lê a resposta como texto
    })
    .then(username => {
        document.getElementById('username-display').textContent = username || "Usuário desconhecido";
    })
    .catch(err => {
        console.error("Erro ao carregar o nome do usuário:", err);
        document.getElementById('username-display').textContent = "Erro ao carregar o usuário";
    });
}

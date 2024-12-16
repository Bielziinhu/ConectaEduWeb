document.addEventListener("DOMContentLoaded", () => {
    // Recuperar o ID da escola da URL
    const urlParams = new URLSearchParams(window.location.search);
    const escolaId = urlParams.get('escolaId');

    if (!escolaId) {
        alert("ID da escola não fornecido!");
        return;
    }

    // Endpoint para buscar a escola e seus eventos
    const EscolaEndpoint = `http://localhost:8080/conecta-edu/v1/escola/${escolaId}`;
    const authToken = localStorage.getItem('authToken');

    // Buscar a escola
    fetch(EscolaEndpoint, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao buscar a escola");
        }
        return response.json();
    })
    .then(data => {
        // Preenche o nome da escola
        document.getElementById('nomeEscola').textContent = data.nome;

        // Carrega os eventos da escola
        carregarEventos(escolaId);
    })
    .catch(err => {
        console.error("Erro ao carregar a escola:", err);
    });

    
    
    
});

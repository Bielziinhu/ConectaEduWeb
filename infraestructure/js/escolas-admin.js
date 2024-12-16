document.addEventListener("DOMContentLoaded", () => {
    // Endpoint da API para buscar as escolas
    const EscolaEndpoint = 'http://localhost:8080/conecta-edu/v1/escola';
    const authToken = localStorage.getItem('authToken');

    // Configurar o cabeçalho da requisição
    fetch(EscolaEndpoint, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Enviar o token para autenticação
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao buscar escolas");
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector("table tbody");
        tbody.innerHTML = ""; // Limpa o conteúdo existente

        // Acessando as escolas a partir do campo 'content'
        const escolas = data.content;

        // Itera sobre as escolas e preenche a tabela
        escolas.forEach(escola => {
            // Adiciona uma linha na tabela com placeholders para a cidade e rua
            const row = `
                <tr id="escola-${escola.id}">
                    <td>${escola.nome}</td>
                    <td id="cidade-${escola.id}">Carregando...</td>
                    <td id="rua-${escola.id}">Carregando...</td>
                    <td>
                        <button onclick="gerenciarEscola(${escola.id})">Clique para Gerenciar</button>
                    </td>
                </tr>`;
            tbody.insertAdjacentHTML('beforeend', row);
            
            // Após carregar a escola, realiza um segundo fetch para pegar o endereço completo
            obterEndereco(escola.id);
        });
    })
    .catch(err => {
        console.error("Erro ao carregar as escolas:", err);
        alert("Erro ao carregar a lista de escolas.");
    });
});

// Função para obter o endereço da escola (cidade e rua)
function obterEndereco(escolaId) {
    const authToken = localStorage.getItem('authToken');
    fetch(`http://localhost:8080/conecta-edu/v1/escola/${escolaId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao buscar detalhes da escola");
        }
        return response.json();
    })
    .then(data => {
        // Atualiza os campos da cidade e rua diretamente na tabela
        document.getElementById(`cidade-${escolaId}`).textContent = data.endereco.cidade || 'Não disponível';
        document.getElementById(`rua-${escolaId}`).textContent = data.endereco.rua || 'Não disponível';
    })
    .catch(err => {
        console.error("Erro ao carregar o endereço da escola:", err);
    });
}

// Função para redirecionar para a página de gerenciamento
function gerenciarEscola(escolaId) {
    window.location.href = `../pages/calendario-admin.html?escolaId=${escolaId}`;
}

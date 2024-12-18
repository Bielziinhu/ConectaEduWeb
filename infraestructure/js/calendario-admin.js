document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const escolaId = urlParams.get('escolaId');

    if (!escolaId) {
        alert("ID da escola não fornecido!");
        return;
    }

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
            document.getElementById("nomeEscola").textContent = data.nome;
            document.getElementById("quantidadeAlunos").textContent = data.quantidadeAlunos;
            document.getElementById("quantidadeEvadidos").textContent = data.quantidadeEvadidos;
            document.getElementById("quantidadeAprovados").textContent = data.quantidadeAprovados;
            document.getElementById("nivelEnsino").textContent = data.nivelEnsino;
            const enderecoCompleto = `${data.endereco.rua}, ${data.endereco.numero}, ${data.endereco.bairro}, ${data.endereco.cidade}, ${data.endereco.estado}, CEP ${data.endereco.cep}`;
            document.getElementById("enderecoEscola").textContent = enderecoCompleto;            
            carregarFeriados();
            carregarEventosEscolares();
            carregarProgramasEducacionais();
        })
        .catch(err => {
            console.error("Erro ao carregar a escola:", err);
        });

    // Função para carregar os feriados
    function carregarFeriados() {
        const FeriadosEndpoint = `http://localhost:8080/conecta-edu/v1/feriado`;
    
        fetch(FeriadosEndpoint, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`Erro ao carregar feriados: ${text}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                const listaFeriados = document.getElementById("listaFeriados");
                listaFeriados.innerHTML = ""; // Limpa a lista
    
                data.content.forEach(feriado => {
                    const li = document.createElement("li");
    
                    // Converter dataInicio e dataFim para um formato legível
                    const dataInicio = new Date(
                        feriado.dataInicio[0], // Ano
                        feriado.dataInicio[1] - 1, // Mês (ajustar para índice 0)
                        feriado.dataInicio[2]  // Dia
                    ).toLocaleDateString();
    
                    const dataFim = new Date(
                        feriado.dataFim[0],
                        feriado.dataFim[1] - 1,
                        feriado.dataFim[2]
                    ).toLocaleDateString();
    
                    li.textContent = `${feriado.nome} - ${dataInicio} a ${dataFim}`;
                    listaFeriados.appendChild(li);
                });
            })
            .catch(err => {
                console.error("Erro ao carregar feriados:", err);
            });
    }

    // Adicionar um novo feriado
    const formFeriado = document.getElementById("formFeriado");
    formFeriado.addEventListener("submit", (event) => {
        event.preventDefault();

        const nomeFeriado = document.getElementById("nomeFeriado").value;
        const dataInicio = document.getElementById("dataInicioFeriado").value;
        const dataFim = document.getElementById("dataFimFeriado").value;

        const novoFeriado = {
            nome: nomeFeriado,
            dataInicio: dataInicio,
            dataFim: dataFim,
        };

        const AdicionarFeriadoEndpoint = `http://localhost:8080/conecta-edu/v1/feriado`;

        fetch(AdicionarFeriadoEndpoint, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(novoFeriado),
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`Erro ao adicionar feriado: ${text}`);
                    });
                }
                return response.json();
            })
            .then(() => {
                alert("Feriado adicionado com sucesso!");
                formFeriado.reset();
                carregarFeriados(); // Atualiza a lista
            })
            .catch(err => {
                console.error(err.message);
            });
    });

    carregarFeriados();
});
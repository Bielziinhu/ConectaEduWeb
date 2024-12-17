document.getElementById('form-adicionar-escola').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão do envio do formulário

    const nomeEscola = document.getElementById('nome-escola').value;
    const cep = document.getElementById('endereco-cep').value;
    const estado = document.getElementById('endereco-estado').value;
    const cidade = document.getElementById('endereco-cidade').value;
    const bairro = document.getElementById('endereco-bairro').value;
    const rua = document.getElementById('endereco-rua').value;
    const numero = document.getElementById('endereco-numero').value;
    const qtdeAlunos = document.getElementById('quantidade-alunos').value;

    const escolaData = {
        nome: nomeEscola,
        quantidadeAlunos: qtdeAlunos, // Inicializando com valor padrão ou obtido através de outros meios
        quantidadeEvadidos: 0,
        quantidadeAprovados: 0,
        nivelEnsino: "Fundamental", // Valor estático ou dinâmico
        endereco: {
            cep: cep,
            estado: estado,
            cidade: cidade,
            bairro: bairro,
            rua: rua,
            numero: numero
        }
    };

    const apiUrl = 'http://localhost:8080/conecta-edu/v1/escola';
    const authToken = localStorage.getItem('authToken');

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}` // Adicionando o Bearer Token
        },
        body: JSON.stringify(escolaData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao criar a escola: ${response.status} ${response.statusText}`);
        }
        return response.json(); // Lê a resposta como JSON
    })
    .then(data => {
        console.log('Escola criada com sucesso:', data);
        alert('Escola criada com sucesso!');
        document.getElementById('form-adicionar-escola').reset(); // Limpa o formulário após o sucesso
    })
    .catch(error => {
        console.error('Erro ao criar a escola:', error);
        alert('Erro ao criar a escola. Por favor, tente novamente.');
    });
});

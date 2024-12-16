document.getElementById('registrar').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    const tipo = document.getElementById('tipo').value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    const usuario = {
        nomeCompleto: nome,
        username: email,
        senha: senha,
        role: tipo
    };

    console.log("Enviando dados para o backend:", usuario);

    const endpoint = "http://localhost:8080/conecta-edu/v1/usuarios";

    fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao cadastrar o usuário");
        }
        return response.json();
    })
    .then(data => {
        console.log("Resposta do servidor:", data); // Log da resposta do backend
        alert("Cadastro realizado com sucesso!");
        window.location.href = tipo === "ROLE_ADMIN" ? "../pages/admin-escola.html" : "../pages/usuario.html";
    })
    .catch(error => {
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao realizar o cadastro. Tente novamente.");
    });
});

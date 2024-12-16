// Seleção dos elementos do formulário
const form = {
    username: document.querySelector("#username"),
    password: document.querySelector("#password"),
    submit: document.querySelector(".btn"), 
    messages: document.getElementById("form-messages") 
};

// URL da API de login
const loginEndpoint = 'http://localhost:8080/conecta-edu/v1/auth';

// Adicionando o evento de clique ao botão de submissão
form.submit.addEventListener("click", (e) => {
    e.preventDefault(); // Evita o comportamento padrão do botão

    // Faz a requisição à API
    fetch(loginEndpoint, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: form.username.value,
            password: form.password.value,
        }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Login falhou. Verifique suas credenciais.");
        }
        return response.json();
    })
    .then((data) => {
        console.log("Login bem-sucedido:", data);
        alert("Login realizado com sucesso!");
    
        // Armazenar o token em localStorage ou sessionStorage
        localStorage.setItem('authToken', data.token); // Assume 'token' é o nome do campo na resposta JSON
    
        // Redireciona o usuário após o login
        window.location.href = '../pages/admin-escola.html';
    })
    
    .catch((err) => {
        console.error("Erro no login:", err);
        alert("Erro ao realizar login. Tente novamente.");
    });
});

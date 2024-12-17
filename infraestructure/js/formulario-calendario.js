// Função para alternar entre os formulários
function mostrarFormulario(formularioId) {
    // Oculta todos os formulários
    document.querySelectorAll('.formulario').forEach(form => {
        form.style.display = 'none';
    });

    // Exibe o formulário selecionado
    const formularioSelecionado = document.getElementById(formularioId);
    if (formularioSelecionado) {
        formularioSelecionado.style.display = 'block';
    }
}

// Exibe o primeiro formulário por padrão
mostrarFormulario('formEvento');
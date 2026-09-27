document.addEventListener("DOMContentLoaded", function () {
    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const form = document.getElementById("cadastroForm");
    const status = document.getElementById("formStatus");

    if (cpf) {
        cpf.addEventListener("input", function () {
            let value = cpf.value.replace(/\D/g, "").slice(0, 11);
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            cpf.value = value;
        });
    }

    if (telefone) {
        telefone.addEventListener("input", function () {
            let value = telefone.value.replace(/\D/g, "").slice(0, 11);
            if (value.length > 10) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
            } else {
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
            }
            telefone.value = value;
        });
    }

    if (cep) {
        cep.addEventListener("input", function () {
            let value = cep.value.replace(/\D/g, "").slice(0, 8);
            value = value.replace(/(\d{5})(\d)/, "$1-$2");
            cep.value = value;
        });
    }

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            if (status) {
                status.textContent =
                    "Cadastro preenchido com sucesso! Este é um projeto acadêmico.";
            }
        });
    }
});
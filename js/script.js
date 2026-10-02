/* =========================================================
   INSTITUTO MÃOS QUE TRANSFORMAM
   script.js
   ========================================================= */


/* =========================================================
   CONFIGURAÇÕES DO LOCALSTORAGE
   ========================================================= */

const STORAGE_USUARIOS = "usuarios";
const STORAGE_FEEDBACKS = "feedbacks";
const STORAGE_USUARIO_LOGADO = "usuarioLogado";


/* =========================================================
   FUNÇÕES AUXILIARES
   ========================================================= */

/**
 * Recupera dados do localStorage.
 */
function getJSON(chave, valorPadrao = []) {
    try {
        const dados = localStorage.getItem(chave);

        if (!dados) {
            return valorPadrao;
        }

        return JSON.parse(dados);
    } catch (erro) {
        console.error("Erro ao ler dados do localStorage:", erro);
        return valorPadrao;
    }
}


/**
 * Salva dados no localStorage.
 */
function salvarJSON(chave, dados) {
    try {
        localStorage.setItem(chave, JSON.stringify(dados));
        return true;
    } catch (erro) {
        console.error("Erro ao salvar dados no localStorage:", erro);
        return false;
    }
}


/**
 * Exibe uma mensagem de status.
 */
function mostrarStatus(mensagem, tipo = "success") {
    const status = document.getElementById("statusMessage");

    if (!status) {
        return;
    }

    status.className = `alert alert-${tipo}`;
    status.textContent = mensagem;
    status.classList.remove("d-none");
    status.style.display = "block";

    status.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


/**
 * Esconde a mensagem de status.
 */
function esconderStatus() {
    const status = document.getElementById("statusMessage");

    if (!status) {
        return;
    }

    status.classList.add("d-none");
    status.style.display = "none";
}


/**
 * Escapa caracteres HTML para evitar inserção indevida de código.
 */
function escaparHTML(valor) {
    if (valor === null || valor === undefined) {
        return "";
    }

    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   MENU MOBILE
   ========================================================= */

function initMenuMobile() {
    const toggler = document.querySelector(".navbar-toggler");

    if (!toggler) {
        return;
    }

    /*
     * O Bootstrap normalmente controla o menu sozinho.
     * Este código complementa o comportamento para manter
     * aria-expanded atualizado.
     */

    const menuId = toggler.getAttribute("data-bs-target");

    if (!menuId) {
        return;
    }

    const menu = document.querySelector(menuId);

    if (!menu) {
        return;
    }

    toggler.addEventListener("click", function () {
        const aberto = toggler.getAttribute("aria-expanded") === "true";

        toggler.setAttribute("aria-expanded", String(!aberto));
    });


    /*
     * Fecha o menu quando um link é selecionado em telas pequenas.
     */
    menu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 991) {
                toggler.setAttribute("aria-expanded", "false");
            }
        });
    });
}


/* =========================================================
   LINK ATIVO DO MENU
   ========================================================= */

function marcarPaginaAtual() {
    const paginaAtual = document.body.getAttribute("data-page");

    if (!paginaAtual) {
        return;
    }

    document.querySelectorAll(".navbar-nav a").forEach(function (link) {
        link.classList.remove("active");
        link.removeAttribute("aria-current");

        const href = link.getAttribute("href");

        if (!href) {
            return;
        }

        const nomePagina = href.split("/").pop();

        if (
            (paginaAtual === "home" && (nomePagina === "index.html" || nomePagina === "")) ||
            (paginaAtual === "projetos" && nomePagina === "projetos.html") ||
            (paginaAtual === "eventos" && nomePagina === "eventos.html") ||
            (paginaAtual === "ajudar" && nomePagina === "ajudar.html") ||
            (paginaAtual === "feedback" && nomePagina === "feedback.html") ||
            (paginaAtual === "login" && nomePagina === "login.html") ||
            (paginaAtual === "cadastro" && nomePagina === "cadastro.html")
        ) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
}


/* =========================================================
   MÁSCARA DE CPF
   ========================================================= */

function mascaraCPF(cpf) {
    return cpf
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .slice(0, 14);
}


/* =========================================================
   MÁSCARA DE TELEFONE
   ========================================================= */

function mascaraTelefone(tel) {
    tel = tel.replace(/\D/g, "");

    if (tel.length > 10) {
        return tel
            .replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3")
            .slice(0, 15);
    }

    return tel
        .replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3")
        .slice(0, 14);
}


/* =========================================================
   MÁSCARA DE CEP
   ========================================================= */

function mascaraCEP(cep) {
    return cep
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 9);
}


/* =========================================================
   VALIDAÇÃO DE CPF
   ========================================================= */

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10), 10)) {
        return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    return resto === parseInt(cpf.substring(10, 11), 10);
}


/* =========================================================
   VALIDAÇÃO DE DATA DE NASCIMENTO
   ========================================================= */

function validarDataNascimento(data) {
    if (!data) {
        return false;
    }

    const hoje = new Date();
    const nascimento = new Date(`${data}T00:00:00`);

    if (Number.isNaN(nascimento.getTime())) {
        return false;
    }

    if (nascimento > hoje) {
        return false;
    }

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mes = hoje.getMonth() - nascimento.getMonth();

    if (
        mes < 0 ||
        (mes === 0 && hoje.getDate() < nascimento.getDate())
    ) {
        idade--;
    }

    return idade >= 18;
}


/* =========================================================
   VALIDAÇÃO DE TELEFONE
   ========================================================= */

function validarTelefone(tel) {
    return /^\(?\d{2}\)?\s\d{4,5}-\d{4}$/.test(tel);
}


/* =========================================================
   VALIDAÇÃO DE CEP
   ========================================================= */

function validarCEP(cep) {
    return /^\d{5}-\d{3}$/.test(cep);
}


/* =========================================================
   MARCAÇÃO VISUAL DE CAMPOS
   ========================================================= */

function marcarCampo(campo, valido) {
    if (!campo) {
        return;
    }

    campo.classList.remove("is-valid", "is-invalid");

    if (valido) {
        campo.classList.add("is-valid");
    } else {
        campo.classList.add("is-invalid");
    }
}


/* =========================================================
   MOSTRAR / OCULTAR SENHA
   ========================================================= */

function initToggleSenha() {
    const botoes = document.querySelectorAll(
        'button[id^="toggleSenha"]'
    );

    botoes.forEach(function (botao) {
        botao.addEventListener("click", function () {
            const input = botao.previousElementSibling;

            if (!input) {
                return;
            }

            if (input.type === "password") {
                input.type = "text";

                botao.innerHTML =
                    '<i class="bi bi-eye-slash" aria-hidden="true"></i>';

                botao.setAttribute(
                    "aria-label",
                    "Ocultar senha"
                );
            } else {
                input.type = "password";

                botao.innerHTML =
                    '<i class="bi bi-eye" aria-hidden="true"></i>';

                botao.setAttribute(
                    "aria-label",
                    "Mostrar senha"
                );
            }
        });
    });
}


/* =========================================================
   MÁSCARAS DO CADASTRO
   ========================================================= */

function initMascarasCadastro() {
    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");

    if (cpf) {
        cpf.addEventListener("input", function () {
            cpf.value = mascaraCPF(cpf.value);
        });
    }

    if (telefone) {
        telefone.addEventListener("input", function () {
            telefone.value = mascaraTelefone(telefone.value);
        });
    }

    if (cep) {
        cep.addEventListener("input", function () {
            cep.value = mascaraCEP(cep.value);
        });
    }
}


/* =========================================================
   VALIDAÇÃO DOS CAMPOS DO CADASTRO
   ========================================================= */

function validarFormularioCadastro() {
    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const dataNascimento = document.getElementById("dataNascimento");
    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const endereco = document.getElementById("endereco");
    const numero = document.getElementById("numero");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado");
    const senha = document.getElementById("senha");
    const confirmarSenha = document.getElementById("confirmarSenha");

    let valido = true;


    /* Nome */

    if (nome) {
        const resultado = nome.value.trim().length >= 3;

        marcarCampo(nome, resultado);

        if (!resultado) {
            valido = false;
        }
    }


    /* E-mail */

    if (email) {
        const emailValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                email.value.trim()
            );

        marcarCampo(email, emailValido);

        if (!emailValido) {
            valido = false;
        }
    }


    /* Data de nascimento */

    if (dataNascimento) {
        const dataValida =
            validarDataNascimento(dataNascimento.value);

        marcarCampo(dataNascimento, dataValida);

        if (!dataValida) {
            valido = false;
        }
    }


    /* CPF */

    if (cpf) {
        const cpfValido = validarCPF(cpf.value);

        marcarCampo(cpf, cpfValido);

        if (!cpfValido) {
            valido = false;
        }
    }


    /* Telefone */

    if (telefone) {
        const telefoneValido =
            validarTelefone(telefone.value);

        marcarCampo(telefone, telefoneValido);

        if (!telefoneValido) {
            valido = false;
        }
    }


    /* CEP */

    if (cep) {
        const cepValido =
            validarCEP(cep.value);

        marcarCampo(cep, cepValido);

        if (!cepValido) {
            valido = false;
        }
    }


    /* Endereço */

    if (endereco) {
        const enderecoValido =
            endereco.value.trim().length >= 3;

        marcarCampo(endereco, enderecoValido);

        if (!enderecoValido) {
            valido = false;
        }
    }


    /* Número */

    if (numero) {
        const numeroValido =
            numero.value.trim().length > 0;

        marcarCampo(numero, numeroValido);

        if (!numeroValido) {
            valido = false;
        }
    }


    /* Cidade */

    if (cidade) {
        const cidadeValida =
            cidade.value.trim().length >= 2;

        marcarCampo(cidade, cidadeValida);

        if (!cidadeValida) {
            valido = false;
        }
    }


    /* Estado */

    if (estado) {
        const estadoValido =
            estado.value.trim().length > 0;

        marcarCampo(estado, estadoValido);

        if (!estadoValido) {
            valido = false;
        }
    }


    /* Senha */

    if (senha) {
        const senhaValida =
            senha.value.length >= 6;

        marcarCampo(senha, senhaValida);

        if (!senhaValida) {
            valido = false;
        }
    }


    /* Confirmação de senha */

    if (confirmarSenha && senha) {
        const senhaConfirmada =
            confirmarSenha.value === senha.value &&
            confirmarSenha.value.length >= 6;

        marcarCampo(
            confirmarSenha,
            senhaConfirmada
        );

        if (!senhaConfirmada) {
            valido = false;
        }
    }


    /* Participação */

    const participacaoSelecionada =
        document.querySelector(
            'input[name="participacao"]:checked'
        );

    if (!participacaoSelecionada) {
        valido = false;
    }


    return valido;
}


/* =========================================================
   CADASTRO
   ========================================================= */

function initCadastro() {
    const form = document.getElementById("formCadastro");

    if (!form) {
        return;
    }

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const dataNascimento =
        document.getElementById("dataNascimento");
    const cpf = document.getElementById("cpf");
    const telefone =
        document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const endereco =
        document.getElementById("endereco");
    const numero =
        document.getElementById("numero");
    const complemento =
        document.getElementById("complemento");
    const cidade =
        document.getElementById("cidade");
    const estado =
        document.getElementById("estado");
    const mensagem =
        document.getElementById("mensagem");
    const senha =
        document.getElementById("senha");


    initMascarasCadastro();


    form.addEventListener("submit", function (event) {
        event.preventDefault();

        esconderStatus();


        /* Validação */

        const formularioValido =
            validarFormularioCadastro();

        if (!formularioValido) {
            mostrarStatus(
                "Verifique os campos destacados e corrija as informações antes de continuar.",
                "danger"
            );

            return;
        }


        /* Recupera usuários */

        const usuarios =
            getJSON(STORAGE_USUARIOS, []);


        /* Verifica e-mail duplicado */

        const emailNormalizado =
            email.value.trim().toLowerCase();

        const usuarioExistente =
            usuarios.some(function (usuario) {
                return (
                    usuario.email &&
                    usuario.email.toLowerCase() ===
                    emailNormalizado
                );
            });


        if (usuarioExistente) {
            marcarCampo(email, false);

            mostrarStatus(
                "Este e-mail já está cadastrado. Utilize outro e-mail ou faça login.",
                "warning"
            );

            return;
        }


        /* Verifica CPF duplicado */

        const cpfLimpo =
            cpf.value.replace(/\D/g, "");

        const cpfExistente =
            usuarios.some(function (usuario) {
                return (
                    usuario.cpf &&
                    usuario.cpf.replace(/\D/g, "") ===
                    cpfLimpo
                );
            });


        if (cpfExistente) {
            marcarCampo(cpf, false);

            mostrarStatus(
                "Este CPF já está cadastrado.",
                "warning"
            );

            return;
        }


        /* Participação */

        const participacao =
            document.querySelector(
                'input[name="participacao"]:checked'
            );


        /* Cria objeto do usuário */

        const novoUsuario = {
            id: Date.now(),

            nome: nome.value.trim(),

            email: emailNormalizado,

            dataNascimento:
                dataNascimento.value,

            cpf: cpf.value.trim(),

            telefone:
                telefone.value.trim(),

            cep:
                cep.value.trim(),

            endereco:
                endereco.value.trim(),

            numero:
                numero.value.trim(),

            complemento:
                complemento
                    ? complemento.value.trim()
                    : "",

            cidade:
                cidade.value.trim(),

            estado:
                estado.value.trim(),

            participacao:
                participacao
                    ? participacao.value
                    : "",

            mensagem:
                mensagem
                    ? mensagem.value.trim()
                    : "",

            senha:
                senha.value,

            dataCadastro:
                new Date().toISOString()
        };


        /* Salva */

        usuarios.push(novoUsuario);

        const salvo =
            salvarJSON(
                STORAGE_USUARIOS,
                usuarios
            );


        if (!salvo) {
            mostrarStatus(
                "Não foi possível salvar o cadastro. Tente novamente.",
                "danger"
            );

            return;
        }


        /* Limpa formulário */

        form.reset();

        form.querySelectorAll(
            ".is-valid, .is-invalid"
        ).forEach(function (campo) {
            campo.classList.remove(
                "is-valid",
                "is-invalid"
            );
        });


        /* Mostra mensagem */

        mostrarStatus(
            "Cadastro realizado com sucesso! Seus dados foram salvos.",
            "success"
        );


        /* Mostra botão/link de login */

        const loginRedirect =
            document.getElementById(
                "loginRedirect"
            );

        if (loginRedirect) {
            loginRedirect.style.display = "block";
        }
    });
}


/* =========================================================
   LOGIN
   ========================================================= */

function initLogin() {
    const form =
        document.getElementById("formLogin");

    if (!form) {
        return;
    }


    const email =
        document.getElementById("email") ||
        document.getElementById("loginEmail");

    const senha =
        document.getElementById("senha") ||
        document.getElementById("loginSenha");


    form.addEventListener("submit", function (event) {
        event.preventDefault();

        esconderStatus();


        if (!email || !senha) {
            mostrarStatus(
                "Não foi possível localizar os campos de login.",
                "danger"
            );

            return;
        }


        const emailDigitado =
            email.value.trim().toLowerCase();

        const senhaDigitada =
            senha.value;


        if (!emailDigitado || !senhaDigitada) {
            mostrarStatus(
                "Informe seu e-mail e sua senha.",
                "danger"
            );

            return;
        }


        const usuarios =
            getJSON(STORAGE_USUARIOS, []);


        const usuario =
            usuarios.find(function (item) {
                return (
                    item.email &&
                    item.email.toLowerCase() ===
                    emailDigitado &&
                    item.senha ===
                    senhaDigitada
                );
            });


        if (!usuario) {
            mostrarStatus(
                "E-mail ou senha incorretos. Confira os dados e tente novamente.",
                "danger"
            );

            return;
        }


        /*
         * Não salvamos a senha no usuário logado.
         */

        const usuarioLogado = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            participacao: usuario.participacao
        };


        salvarJSON(
            STORAGE_USUARIO_LOGADO,
            usuarioLogado
        );


        mostrarStatus(
            `Login realizado com sucesso! Bem-vinda, ${usuario.nome}.`,
            "success"
        );


        /*
         * Se existir um link para a página inicial,
         * ele fica disponível normalmente.
         */

        const redirect =
            document.getElementById(
                "loginRedirect"
            );

        if (redirect) {
            redirect.style.display = "block";
        }
    });
}


/* =========================================================
   FEEDBACK - RENDERIZAÇÃO
   ========================================================= */

function renderizarFeedbacks() {
    const lista =
        document.getElementById(
            "feedbackList"
        );

    if (!lista) {
        return;
    }


    const feedbacks =
        getJSON(
            STORAGE_FEEDBACKS,
            []
        );


    if (feedbacks.length === 0) {
        lista.innerHTML = `
            <div class="alert alert-light border">
                Ainda não há feedbacks cadastrados.
                Seja a primeira pessoa a compartilhar sua experiência!
            </div>
        `;

        return;
    }


    /*
     * Mostra os feedbacks mais recentes primeiro.
     */

    const feedbacksOrdenados =
        [...feedbacks].reverse();


    lista.innerHTML =
        feedbacksOrdenados
            .map(function (feedback) {

                const nome =
                    escaparHTML(
                        feedback.nome
                    );

                const mensagem =
                    escaparHTML(
                        feedback.mensagem
                    );

                const avaliacao =
                    Number(
                        feedback.avaliacao
                    ) || 0;


                const estrelas =
                    "★".repeat(
                        Math.max(
                            0,
                            Math.min(
                                5,
                                avaliacao
                            )
                        )
                    );


                const data =
                    feedback.data
                        ? new Date(
                            feedback.data
                        ).toLocaleDateString(
                            "pt-BR"
                        )
                        : "";


                return `
                    <article class="card shadow-sm border-0 mb-3">
                        <div class="card-body">

                            <div class="d-flex justify-content-between align-items-start gap-3">

                                <div>
                                    <h3 class="h5 mb-1">
                                        ${nome}
                                    </h3>

                                    <div
                                        class="text-warning"
                                        aria-label="Avaliação: ${avaliacao} de 5"
                                    >
                                        ${estrelas}
                                    </div>
                                </div>

                                ${
                                    data
                                        ? `
                                            <small class="text-muted">
                                                ${data}
                                            </small>
                                        `
                                        : ""
                                }

                            </div>

                            <p class="mb-0 mt-3">
                                ${mensagem}
                            </p>

                        </div>
                    </article>
                `;
            })
            .join("");
}


/* =========================================================
   FEEDBACK
   ========================================================= */

function initFeedback() {
    const form =
        document.getElementById(
            "formFeedback"
        );

    if (!form) {
        return;
    }


    renderizarFeedbacks();


    form.addEventListener("submit", function (event) {
        event.preventDefault();

        esconderStatus();


        const nome =
            document.getElementById("nome");

        const email =
            document.getElementById("email");

        const avaliacao =
            document.getElementById("avaliacao");

        const mensagem =
            document.getElementById("mensagem");


        if (!nome || !avaliacao || !mensagem) {
            mostrarStatus(
                "Não foi possível localizar todos os campos do feedback.",
                "danger"
            );

            return;
        }


        const nomeValor =
            nome.value.trim();

        const emailValor =
            email
                ? email.value.trim()
                : "";

        const avaliacaoValor =
            Number(
                avaliacao.value
            );

        const mensagemValor =
            mensagem.value.trim();


        let valido = true;


        if (nomeValor.length < 3) {
            marcarCampo(nome, false);
            valido = false;
        } else {
            marcarCampo(nome, true);
        }


        if (
            email &&
            emailValor &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                emailValor
            )
        ) {
            marcarCampo(email, false);
            valido = false;
        } else if (email) {
            marcarCampo(email, true);
        }


        if (
            !Number.isInteger(avaliacaoValor) ||
            avaliacaoValor < 1 ||
            avaliacaoValor > 5
        ) {
            marcarCampo(avaliacao, false);
            valido = false;
        } else {
            marcarCampo(avaliacao, true);
        }


        if (mensagemValor.length < 5) {
            marcarCampo(mensagem, false);
            valido = false;
        } else {
            marcarCampo(mensagem, true);
        }


        if (!valido) {
            mostrarStatus(
                "Verifique os campos destacados antes de enviar seu feedback.",
                "danger"
            );

            return;
        }


        const feedbacks =
            getJSON(
                STORAGE_FEEDBACKS,
                []
            );


        const novoFeedback = {
            id: Date.now(),

            nome:
                nomeValor,

            email:
                emailValor,

            avaliacao:
                avaliacaoValor,

            mensagem:
                mensagemValor,

            data:
                new Date().toISOString()
        };


        feedbacks.push(
            novoFeedback
        );


        const salvo =
            salvarJSON(
                STORAGE_FEEDBACKS,
                feedbacks
            );


        if (!salvo) {
            mostrarStatus(
                "Não foi possível enviar seu feedback.",
                "danger"
            );

            return;
        }


        form.reset();


        form.querySelectorAll(
            ".is-valid, .is-invalid"
        ).forEach(function (campo) {
            campo.classList.remove(
                "is-valid",
                "is-invalid"
            );
        });


        mostrarStatus(
            "Feedback enviado com sucesso! Obrigada por compartilhar sua experiência.",
            "success"
        );


        renderizarFeedbacks();
    });
}


/* =========================================================
   EVENTOS
   ========================================================= */

/*
 * A página de eventos é uma página HTML própria.
 * Não existe redirecionamento de eventos para cadastro aqui.
 *
 * Esta função apenas garante que links ou botões de eventos
 * que utilizem data-event-link possam apresentar uma mensagem
 * de forma dinâmica.
 */

function initEventos() {
    const botoes =
        document.querySelectorAll(
            "[data-event-link]"
        );


    botoes.forEach(function (botao) {
        botao.addEventListener(
            "click",
            function () {

                const mensagem =
                    botao.getAttribute(
                        "data-event-link"
                    );


                if (!mensagem) {
                    return;
                }


                const destino =
                    document.getElementById(
                        "eventStatus"
                    );


                if (destino) {
                    destino.textContent =
                        mensagem;

                    destino.classList.remove(
                        "d-none"
                    );
                }
            }
        );
    });
}


/* =========================================================
   BOTÃO VOLTAR AO TOPO
   ========================================================= */

function initVoltarTopo() {
    const botao =
        document.getElementById(
            "voltarTopo"
        );

    if (!botao) {
        return;
    }


    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 300) {
                botao.classList.remove(
                    "d-none"
                );
            } else {
                botao.classList.add(
                    "d-none"
                );
            }
        }
    );


    botao.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );
}


/* =========================================================
   LINK DE LOGIN APÓS CADASTRO
   ========================================================= */

function initLoginRedirect() {
    const redirect =
        document.getElementById(
            "loginRedirect"
        );

    if (!redirect) {
        return;
    }


    /*
     * O link já existe no HTML.
     * Apenas garantimos que ele continue acessível
     * depois do cadastro.
     */

    redirect.addEventListener(
        "click",
        function () {
            window.location.href =
                "login.html";
        }
    );
}


/* =========================================================
   VERIFICAÇÃO DO USUÁRIO LOGADO
   ========================================================= */

function verificarUsuarioLogado() {
    const usuario =
        getJSON(
            STORAGE_USUARIO_LOGADO,
            null
        );


    if (!usuario) {
        return;
    }


    const elementos =
        document.querySelectorAll(
            "[data-usuario-nome]"
        );


    elementos.forEach(function (elemento) {
        elemento.textContent =
            usuario.nome || "";
    });
}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initMenuMobile();

        marcarPaginaAtual();

        initToggleSenha();

        initCadastro();

        initLogin();

        initFeedback();

        initEventos();

        initVoltarTopo();

        initLoginRedirect();

        verificarUsuarioLogado();
    }
);
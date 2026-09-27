INSTITUTO MÃOS QUE TRANSFORMAM
Projeto acadêmico — Desenvolvimento Front-end

SOBRE O PROJETO

O Instituto Mãos que Transformam é um projeto acadêmico desenvolvido com o objetivo de aplicar conhecimentos de Desenvolvimento Front-end na criação de uma página web institucional para uma organização do terceiro setor.

O projeto apresenta a instituição, seus projetos sociais e um formulário para pessoas interessadas em participar das ações como voluntárias, doadoras ou em ambas as modalidades.

ESTRUTURA DO PROJETO

projeto-ong-organizado/
│
├── html/
│   ├── index.html
│   ├── projetos.html
│   └── cadastro.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── imagens/
│   ├── banner.jpg
│   ├── projetos.jpg
│   ├── voluntarios.jpg
│   └── doacao.jpg
│
└── README.txt


DESCRIÇÃO DOS ARQUIVOS

HTML
- index.html: página inicial e apresentação do Instituto.
- projetos.html: apresentação dos projetos e iniciativas sociais.
- cadastro.html: formulário para cadastro de voluntários e doadores.

CSS
- style.css: responsável pela estilização, organização visual e responsividade das páginas.

JAVASCRIPT
- script.js: responsável pelas funcionalidades de interação e pelas máscaras dos campos do formulário.

IMAGENS
- banner.jpg: imagem utilizada no banner da página inicial, criada a partir de um recorte da fotografia real de voluntariado utilizada no projeto.
- projetos.jpg: fotografia utilizada no projeto Educação para Todos.
- voluntarios.jpg: fotografia utilizada no projeto de Voluntariado.
- doacao.jpg: fotografia utilizada no projeto Cestas Solidárias.


RECURSOS IMPLEMENTADOS

- HTML5 semântico
- CSS3
- JavaScript
- Navegação entre páginas
- Separação entre HTML, CSS e JavaScript
- Estrutura organizada de diretórios
- Formulário com fieldset e legend
- Validação nativa do HTML5
- Campos obrigatórios com required
- Pattern para CPF, telefone e CEP
- maxlength para controle da quantidade de caracteres
- Máscara de CPF
- Máscara de telefone
- Máscara de CEP
- Layout responsivo
- Textos alternativos (alt) nas imagens


FORMULÁRIO DE CADASTRO

O formulário foi organizado em grupos utilizando fieldset e legend para facilitar o preenchimento e manter uma estrutura semântica.

Os campos foram divididos em:

- Dados pessoais
- Dados de contato
- Endereço
- Forma de participação
- Mensagem

As formas de participação disponíveis são:

- Voluntariado
- Doação
- Voluntariado e doação


VALIDAÇÃO DOS DADOS

Foram utilizadas funcionalidades nativas do HTML5 para auxiliar na validação dos dados antes do envio do formulário.

O atributo pattern foi utilizado para estabelecer formatos de entrada para:

- CPF
- Telefone
- CEP

Também foram utilizados atributos como required e maxlength.

O JavaScript complementa o formulário com máscaras para facilitar o preenchimento dos campos de CPF, telefone e CEP.


VALIDAÇÃO PELO W3C

Os arquivos HTML do projeto foram submetidos ao W3C Validator para verificar a estrutura dos documentos.

Foram validados:

- index.html
- projetos.html
- cadastro.html

Durante a validação inicial do cadastro.html, foram identificados um problema relacionado ao atributo autocomplete utilizado no campo de endereço e um aviso relacionado à ausência de um título na seção do formulário.

Após os ajustes realizados, o cadastro.html foi submetido novamente ao validador.

O resultado final dos três documentos foi concluído sem erros ou avisos estruturais.


FINALIDADE DO PROJETO

Este projeto possui finalidade acadêmica e foi desenvolvido para demonstrar a aplicação prática de conhecimentos de Desenvolvimento Front-end, incluindo estruturação semântica, estilização, responsividade, formulários, validação de dados, JavaScript e organização de arquivos.

Autora:
Rayane Leandro de Lima Nogueira

Projeto acadêmico — Desenvolvimento Front-end
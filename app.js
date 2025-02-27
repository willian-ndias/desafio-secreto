//armazenar lista do amigo secreto
let amigos = [];
let numeroLimite = 30;
let tentativas = 1;

function exibirTextoNaTela(tag, texto) 
{
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});

}
function exibirMensagemInicial() 
{
    exibirTextoNaTela('h1', 'Amigo Secreto');
    exibirTextoNaTela('h2', 'Gigite Nome e Sobrenome');

}

exibirMensagemInicial();

function verificarNome () 
{
    let Nome = document.querySelector('input').value;
}
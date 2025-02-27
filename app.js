//armazenar lista do amigo secreto
let listaDeAmigos = [];
let sorteioRealizado = false;
let sorteioDisponivel = [];
let resultado = [];

function exibirTextoNaTela(tag, texto) 
{
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});

}
function exibirMensagemInicial() 
{
    exibirTextoNaTela('h1', 'Amigo Secreto');
    exibirTextoNaTela('p', 'Digite Nome e Sobrenome');

}

exibirMensagemInicial();

// adicionando nomes
function adicionarAmigo() 

{

    const inputAmigo = document.querySelector('#amigo');
    const nomeAmigo = inputAmigo.value.trim();

    if (!nomeAmigo.includes(' ')) 
        {
        alert('Por favor, insira nome e sobrenome.');
        return;
    }

    if (listaDeAmigos.includes(nomeAmigo)) 
        {
        alert('Nome já inserido. Insira um nome e sobrenome ainda não adicionados.');
        return;
    }

    listaDeAmigos.push(nomeAmigo);
    atualizarListaAmigos();
    inputAmigo.value = '';
    atualizarEstadoBotoes();

     }

     function atualizarListaAmigos() 
{
    const listaAmigos = document.querySelector('#listaAmigos');
    listaAmigos.innerHTML = '';

    listaDeAmigos.forEach((amigo, index) => 
        {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${amigo}`;
        listaAmigos.appendChild(li);
    });
}

function atualizarEstadoBotoes() 
{
    const botaoSortear = document.querySelector('.button-draw');
    botaoSortear.disabled = listaDeAmigos.length < 3 || (sorteioRealizado && indiceAtual >= listaDeAmigos.length);
}

// sorteando nomes 

function sortearAmigo() 
{
    if (listaDeAmigos.length < 3) 
        {
        alert('Adicione pelo menos três amigos para o sorteio!');
        return;
    }

    if (!sorteioRealizado) 
        {
        sorteioDisponivel = [...listaDeAmigos];
        resultado = [];
        indiceAtual = 0;
        sorteioRealizado = true;
        estado = 'SORTEIO';
    }

    if (estado === 'SORTEIO') 
        {
        const amigoAtual = listaDeAmigos[indiceAtual];
        let opcoesDisponiveis = sorteioDisponivel.filter(nome => nome !== amigoAtual);

        if (opcoesDisponiveis.length === 0) 
            {
            alert('Erro no sorteio. Reiniciando...');
            sorteioRealizado = false;
            return;
        }

        const sorteado = opcoesDisponiveis[Math.floor(Math.random() * opcoesDisponiveis.length)];
        resultado.push(`${amigoAtual} → ${sorteado}`);
        sorteioDisponivel = sorteioDisponivel.filter(nome => nome !== sorteado);

        exibirResultado(resultado[resultado.length - 1]);
        estado = 'PROXIMO';
    } else if (estado === 'PROXIMO') 
        {
        if (indiceAtual < listaDeAmigos.length - 1)
             {
            exibirResultado('PRÓXIMO');
            indiceAtual++;
            estado = 'SORTEIO';
        } else 
        {
            exibirResultado('FIM');
            sorteioRealizado = false;
            document.querySelector('.button-draw').disabled = true;
        }
    }
} 

function exibirResultado(resultadoAtual) 
{
    const listaResultado = document.querySelector('#resultado');
    listaResultado.innerHTML = '';

    const li = document.createElement('li');
    li.textContent = resultadoAtual;
    listaResultado.appendChild(li);

}
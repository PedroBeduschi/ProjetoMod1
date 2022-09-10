//Pega os dados do local storage e faz um array de objetos
var extrato0 = localStorage.getItem('extrato')
if (extrato0 != null)
{
    var extrato = JSON.parse(extrato0);
}
else
{
    var extrato = [];
}

//Função que desenha a tabela e calcula o resultado final
function desenhaTabela()
{ 
    let total = 0;

    for (entrada in extrato)
    {
        document.querySelector('table.tabela tbody').innerHTML += `
        <tr>
            <td>${ (extrato[entrada].tipo == 'compra' ? '-' : '+')}</td>
            <td>${ extrato[entrada].descricao }</td>
            <td style="text-align: right;"> R$ ${ extrato[entrada].valor }</td>
        </tr>`
        
        //Definição se o valor é positivo ou negativo
        if (extrato[entrada].tipo == 'compra')
        {
            total -= JSON.parse(extrato[entrada].valor);
        }
        else
        {
            total += JSON.parse(extrato[entrada].valor);
        }
        
    }

    //Cálculo do resultado
    if (total >= 0)
    {
        document.getElementById('total').innerHTML = 'R$ '+total.toFixed(2)+ '<br><div id="resultadoFinal" style="font-size: 10px; font-weight: normal;">[LUCRO]</div>';
    }
    else
    {
        document.getElementById('total').innerHTML = 'R$ '+total.toFixed(2)+ '<br><div id="resultadoFinal" style="font-size: 10px; font-weight: normal;">[DÉFICIT]</div>';
    }

    console.log(total);
}

//Testando o formulário e mandando dados inseridos
function testaFormulario(e)
{
    var extrato0 = localStorage.getItem('extrato')
    if (extrato0 != null)
    {
        var extrato = JSON.parse(extrato0);
    }
    else
    {
        var extrato = [];
    }

    if (document.getElementById('valor').value == '' || document.getElementById('nomemercadoria').value == '')
    {
        e.preventDefault();
        alert('Preencha todos os campos antes de enviar.');
    }
    else
    {
        //corrige o valor mandado pela máscara
        var valorCorrigido = e.target.elements['valor'].value;
        valorCorrigido = (valorCorrigido).replace(/[^0-9]+/g, '.');
        console.log(valorCorrigido);

        extrato.push(
            {
                tipo: e.target.elements['transacao'].value,
                descricao: e.target.elements['nomemercadoria'].value,
                valor: valorCorrigido
            }
        )

        localStorage.setItem('extrato', JSON.stringify(extrato));

        desenhaTabela();
    }
}

//Excluir os dados da tabela com mensagem de confirmação
function limparDados()
{
    let mensagem = 'Você está prestes a excluir os dados do extrato.\nTem certeza que deseja excluir?'
    if (confirm(mensagem))
    {
        localStorage.clear();
        extrato = [];
        desenhaTabela();
        location.href="./index.html";
    }
       
}

//Aplica a máscara para o valor
function mascara()
{
    var novoValor = document.getElementById('valor').value;
    novoValor = (novoValor).replace(/[^0-9]+/g, '');
    novoValor = (novoValor).replace(/([0-9][0-9])$/g, ',$1');

    document.getElementById('valor').value = novoValor;

    console.log(novoValor);
}

desenhaTabela();
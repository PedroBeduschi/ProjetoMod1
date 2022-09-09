var extrato0 = localStorage.getItem('extrato')
if (extrato0 != null)
{
    var extrato = JSON.parse(extrato0);
}
else
{
    var extrato = [];
}

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
    
        if (extrato[entrada].tipo == 'compra')
        {
            total -= JSON.parse(extrato[entrada].valor);
        }
        else
        {
            total += JSON.parse(extrato[entrada].valor);
        }
        
    }

    if (total >= 0)
    {
        document.getElementById('total').innerHTML = 'R$ '+total+ '<br><div id="resultadoFinal" style="font-size: 10px; font-weight: normal;">[LUCRO]</div>';
    }
    else
    {
        document.getElementById('total').innerHTML = 'R$ '+total+ '<br><div id="resultadoFinal" style="font-size: 10px; font-weight: normal;">[DÉFICIT]</div>';
    }

    console.log(total);
}

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

    extrato.push(
        {
            tipo: e.target.elements['transacao'].value,
            descricao: e.target.elements['nomemercadoria'].value,
            valor: e.target.elements['valor'].value
        }
    )

    localStorage.setItem('extrato', JSON.stringify(extrato));

    desenhaTabela();

}

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

desenhaTabela();
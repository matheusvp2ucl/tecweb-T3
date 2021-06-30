function PegaTabelinha(produto){
    aux = `<tr>
        <th scope="row">${produto.codigo}</th>
        <td>${produto.nome}</td>
        <td>${produto.unidade}</td>
        <td>${produto.quantidade}</td>
        <td>${ produto.ativo ? '<i class="fas fa-toggle-on" style="color: blue; font-size: 1.5rem;">' : '<i class="fas fa-toggle-off" style="font-size: 1.5rem;"> '}</i></td>
        <td class="btnSpac">
            <button onclick="cProduto.editarProduto(${produto.codigo})" class="btn btn-outline-success btnSpac"><i class="fas fa-pencil-alt btnSpac" ></i></button>
            <button onclick="cProduto.excluirProduto(${produto.codigo})" class="btn btn-outline-danger btnSpac"><i class="fas fa-trash btnSpac"></i></button>
        </td>
    </tr>\n`;
    return aux;
}

function PegaComprinha(produto){
    aux = `
        <div class="row">
            <span class="col-2" id="cod-${produto.codigo}">${produto.codigo}</span>
            <span class="col-3" id="prod-${produto.codigo}">${produto.nome}</span>
            <span class="col-3" id="uni-${produto.codigo}">${produto.unidade}</span>
            <div class="col-2">
                <input class="form-control col-1" id="prod-qtd-${produto.codigo}" type="text"  value="${produto.quantidade}" disabled>
            </div>
            <div class="col-2">
                <input onblur="cCompras.pegaProduto(${produto.codigo});" onmouseout="cCompras.pegaProduto(${produto.codigo});" class="form-control" id="prod-get-qtd-${produto.codigo}" value="${produto.quantidade_comprada}" type="number">
            </div>
        </div>
    `
    return aux;
}

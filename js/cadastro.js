class Produto {
    constructor(codigo, nome, unidade, quantidade, codigo_barra="", ativo=true){
        this.codigo = codigo;
        this.nome = nome;
        this.unidade = unidade;
        this.quantidade = quantidade;
        this.codigo_barra = codigo_barra;
        this.ativo = ativo;
    }
}

function BaseTabela( produto ){
    let { codigo, nome, unidade, quantidade } = produto;
    aux = `<tr>
        <td>${codigo}</td>
        <td>${nome}</td>
        <td>${unidade}</td>
        <td>${quantidade}</td>
        <td>
            <input type="button" onclick="" value="Editar">
            <input type="button" onclick="" value="Excluir">
        </td>
    </tr>`;
    return aux;
}

var ControllerCadastro = {
    listaProdutos : () => [],

    atualizarLista : (produto) => {
        this.listaProdutos.push(produto)
    },

    atualizarTabela : () => {
        let tb_produtos = document.getElementById("tb_produtos");
        aux = "";
        this.listaProdutos.forEach(produto => {
            aux += BaseTabela(produto);
        });
        tb_produtos.innerHTML = aux;
    },

    mostrar : () => {
        console.log(this.listaProdutos);
    }
}

// ControllerCadastro.atualizarLista(new Produto(1, "Coca Cola", "Lata", 20))
ControllerCadastro.mostrar()
class Produto {
    constructor(
        codigo,
        nome,
        unidade,
        quantidade,
        codigo_barra = "",
        ativo = true
    ) {
        this.codigo = codigo;
        this.nome = nome;
        this.unidade = unidade;
        this.quantidade = quantidade;
        this.codigo_barra = codigo_barra;
        this.ativo = ativo;
    }
}

class Pessoa{
    constructor(codigo, nome){
        this.codigo = codigo
        this.nome = nome
    }
}

function BaseTabela(produto) {
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

var controllerDados = {
    listaProdutos: [],

    getLocalStorage : function(){
        let bancoLocal = localStorage.getItem("listaProdutos");
        this.listaProdutos = JSON.parse(bancoLocal);
        return this.listaProdutos;
    },

    setLocalStorage : () => {
        localStorage.setItem(
            "listaProdutos",
            JSON.stringify(this.listaProdutos)
        );
    },

    Get_Produto: (codigo) => {
        this.getLocalStorage();
        return this.listaProdutos.filter( elemento =>  elemnto.codigo == codigo );
    },

    Get_Produtos: () => {
        this.getLocalStorage();
        return this.listaProdutos;
    },

    Post_Produto: (produto) => {
        this.getLocalStorage();
        if (this.listaProdutos.length == 0) produto.codigo = 1;
        else produto.codigo = this.listaProdutos[this.listaProdutos.length - 1].codigo + 1;
        this.listaProdutos.push(produto);
        this.setLocalStorage();
    },

    Update_Produto: (produto) => {
        this.getLocalStorage();
        let index = this.listaProdutos.findIndex( elemento => elemento.codigo == produto.codigo );
        this.listaProdutos[index] = produto;
        this.setLocalStorage();
    },



    Atualiza_Tabela: () => {
        let tb_produtos = document.getElementById("tb_produtos");
        aux = "";
        this.listaProdutos.forEach((produto) => {
            aux += BaseTabela(produto);
        });
        tb_produtos.innerHTML = aux;
    },

    mostrar: () => {
        console.log(this.listaProdutos);
    },
};



controllerDados.Post_Produto(new Produto("", "Coca Cola", "Lata", 20))

var cProduto = {
    listaProdutos: [],

    getlistaProdutos: function () {
        if (!localStorage.getItem("listaProdutos")) {
            this.setlistaProdutos();
            return this.listaProdutos;
        }
        this.listaProdutos = JSON.parse(localStorage.getItem("listaProdutos"));
        return this.listaProdutos;
    },

    setlistaProdutos: function () {
        localStorage.setItem(
            "listaProdutos",
            JSON.stringify(this.listaProdutos)
        );
    },

    getProdutos: function () {
        this.getlistaProdutos();
        return this.listaProdutos();
    },

    getProduto: function (codigo) {
        this.getlistaProdutos();
        return this.listaUsuarios.find((produto) => {
            return produto.codigo == codigo;
        });
    },

    validadorCadastro: function () {
        const inpNome = document.getElementById("inpNome");
        const inpUnidade = document.getElementById("inpUnidade");
        const inpQuantidade = document.getElementById("inpQuantidade");

        if (
            inpNome.value == "" ||
            inpUnidade.value == "" ||
            inpQuantidade.value == ""
        ) {
            return false;
        }

        return true;
    },

    toggle: function (checked) {
        var elm = document.getElementById("inpAtivo");
        if (checked != elm.checked) {
            elm.click();
        }
    },

    resetCamposProdutos: function () {
        document.getElementById("inpCodigo").value = null;
        document.getElementById("inpNome").value = null;
        document.getElementById("inpUnidade").value = null;
        document.getElementById("inpQuantidade").value = null;
        this.toggle(false);
    },

    salvarProduto: function (produto) {
        this.getlistaProdutos();
        this.listaProdutos.push(produto);
        this.setlistaProdutos();
    },

    getUltimoCodigo: function () {
        this.getlistaProdutos();
        if (this.listaProdutos.length == 0) {
            return 1;
        }
        return this.listaProdutos[this.listaProdutos.length - 1].codigo + 1;
    },
};

let produto1 = new Produto(1, "Coca Cola", "Lata", 20);
let produto2 = new Produto(20, "Arroz", "Quilo", 10);

// cProduto.salvarProduto(produto1)
// cProduto.salvarProduto(produto2)

// console.log(cProduto.getUltimoCodigo());

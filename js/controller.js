var cCompras = {
    listaCompras: [],

    getlistaCompras: function () {
        if (!localStorage.getItem("listaCompras")) {
            this.setlistaCompras();
            return this.listaCompras;
        }
        this.listaCompras = JSON.parse(localStorage.getItem("listaCompras"));
        return this.listaCompras;
    },

    setlistaCompras: function () {
        localStorage.setItem(
            "listaCompras",
            JSON.stringify(this.listaCompras)
        );
    },

    riscaPalavra: function(ell, ok){
        if (ok) {
            ell.style.textDecoration = "line-through";
        } else {
            ell.style.textDecoration = "none";
        }
    },

    buttonAtivado: function(ok){
        const ell = document.getElementById("btn_enviar");
        if(!ok){
            ell.disabled = true;
        }else{
            ell.disabled = false;
        }
    },

    verificaColetados: function(){
        const compras = this.getlistaCompras();
        const quantidadeColetado = compras.filter(prod => prod.coletado == true).length;
        if(compras.length == quantidadeColetado){
            this.buttonAtivado(true);
        }else{
            this.buttonAtivado(false);
        }
    },

    coletaProduto: function(codigo, coleta){
        this.getlistaCompras();
        let index = this.listaCompras.findIndex(p => { return p.codigo == codigo })
        this.listaCompras[index].coletado = coleta
        this.setlistaCompras();
    },

    pegaProduto: function(codigo){

        let ell_cod = document.getElementById(`cod-${codigo}`);
        let ell_prod = document.getElementById(`prod-${codigo}`);
        let ell_uni = document.getElementById(`uni-${codigo}`);
        let ell_prod_qtd = document.getElementById(`prod-qtd-${codigo}`);
        let ell_prod_get_qtd = document.getElementById(`prod-get-qtd-${codigo}`);



        if(parseFloat(ell_prod_get_qtd.value) >= parseFloat(ell_prod_qtd.value)){
            this.riscaPalavra(ell_cod, true);
            this.riscaPalavra(ell_prod, true);
            this.riscaPalavra(ell_uni, true);
            this.coletaProduto(codigo, true);
        }else{
            this.riscaPalavra(ell_cod, false);
            this.riscaPalavra(ell_prod, false);
            this.riscaPalavra(ell_uni, false);
            this.coletaProduto(codigo, false);
        }

        this.salvaQuantidadeComprada(codigo, parseFloat(ell_prod_get_qtd.value));

        this.verificaColetados();

    },

    atualizaTabelaCompras: function(){
        this.atualizaAtivosCompras();
        this.atualizaListaCompras();
        const prodAtivos = this.getlistaCompras();
        let aux = "";
        prodAtivos.forEach(produto => {
            aux += PegaComprinha(produto);
        })
        document.getElementById("listagem").innerHTML = aux;
    },

    getProduto: function (codigo) {
        this.getlistaCompras();
        return this.listaCompras.find((produto) => {
            return produto.codigo == codigo;
        });
    },

    atualizaListaCompras: function(){
        this.getlistaCompras();
        let baseLista = this.getlistaCompras();
        const prodAtivos = cProduto.getProdutosAtivos();
        for (let i = 0; i < prodAtivos.length; i++) {
            const produto = prodAtivos[i];
            let isNewProduct = this.getProduto(produto.codigo);
            if(!isNewProduct){
                baseLista.push( new Compra(
                    produto.codigo,
                    produto.nome,
                    produto.unidade,
                    produto.quantidade,
                    produto.codigo_barra,
                    produto.ativo,
                    0,
                    false
                ));
            }
        }
        this.listaCompras = baseLista;
        this.setlistaCompras();
    },

    atualizaAtivosCompras: function(){
        const atual = this.getlistaCompras();
        const ativos = cProduto.getProdutosAtivos();
        let baseCompras = [];

        for(let i=0; i<atual.length; i++){
            let prod = atual[i];
            let isExists = ativos.find( produto => produto.codigo == prod.codigo);
            if(isExists){
                baseCompras.push(prod);
            }
        }
        this.listaCompras = baseCompras;
        this.setlistaCompras();
    },

    salvaQuantidadeComprada: function(codigo, qtd_compra){
        this.getlistaCompras();
        let index = this.listaCompras.findIndex(p => { return p.codigo == codigo })
        this.listaCompras[index].quantidade_comprada = qtd_compra
        this.setlistaCompras();
    },

    enviarCompra: async function(){

        // Enviar para API
        const primeiro = await cMockApi.enviarDataCompra();

        const compras = this.getlistaCompras();

        for(let i=0 ; i < compras.length ; i++ ){
            let produto = compras[i];
            const dataProduto = this.baseRetornoApi(produto);
            await cMockApi.enviarCompras(primeiro.CodCompras, dataProduto);
        }

        alert("Itens enviados sucesso")

        this.listaCompras = [];
        this.setlistaCompras();
        this.atualizaTabelaCompras();
    },

    baseRetornoApi: function(produto){
        return {
            cdProduto: produto.codigo,
            Nome: produto.nome,
            Unidade: produto.unidade,
            Quantidade: produto.quantidade,
            CodigoBarra: produto.codigo_barra,
            Ativo: produto.ativo,
            QuantComprada: produto.quantidade_comprada
        }
    }

}

var cMockApi = {

    endpoint_api: "https://60da4ff75f7bf10017547a7a.mockapi.io/ap1/v1",

    enviarDataCompra: async function(){
        const resp = await fetch( this.endpoint_api + "/Compras", { method: "POST" });
        return resp.json();
    },

    enviarCompras: async function(CodCompra, data){
        const resp = await fetch( this.endpoint_api + `/Compras/${CodCompra}/produtos`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        return resp.json();
    }

}


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
        return this.listaProdutos.find((produto) => {
            return produto.codigo == codigo;
        });
    },

    validadorCadastro: function () {
        const inpNome = document.getElementById("inpNome");
        const inpUnidade = document.getElementById("inpUnidade");
        const inpQuantidade = document.getElementById("inpQuantidade");

        if ( inpNome.value == "" || inpUnidade.value == "" || inpQuantidade.value == "" ) {
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
        document.getElementById("inpBarra").value = null;
        this.toggle(true);
    },

    salvarProduto: function (produto) {
        this.getlistaProdutos();
        let isNewProduct = this.getProduto(produto.codigo);
        if(!isNewProduct){
            this.listaProdutos.push(produto);
        }else{
            let index = this.listaProdutos.findIndex( p => { return p.codigo == produto.codigo });
            this.listaProdutos[index].nome          = produto.nome;
            this.listaProdutos[index].unidade       = produto.unidade;
            this.listaProdutos[index].quantidade    = produto.quantidade;
            this.listaProdutos[index].codigo_barra  = produto.codigo_barra;
            this.listaProdutos[index].ativo         = produto.ativo;
        }

        this.setlistaProdutos();
    },

    getUltimoCodigo: function () {
        this.getlistaProdutos();
        if (this.listaProdutos.length == 0) {
            return 1;
        }
        return this.listaProdutos[this.listaProdutos.length - 1].codigo + 1;
    },

    editarProduto: function(codigo){
        this.getlistaProdutos();
        const produto = this.getProduto(codigo);
        document.getElementById("inpCodigo").value = produto.codigo;
        document.getElementById("inpNome").value = produto.nome;
        document.getElementById("inpUnidade").value = produto.unidade;
        document.getElementById("inpQuantidade").value = produto.quantidade;
        document.getElementById("inpBarra").value = produto.codigo_barra;
        this.toggle(produto.ativo);
        md_produto.show();
    },

    excluirProduto: async function(codigo){
        this.getlistaProdutos();
        let produto = this.getProduto(codigo);
        let index = this.listaProdutos.findIndex( produto => { return produto.codigo == codigo});
        if (index >= 0){
            this.listaProdutos.splice(index,1);
        }
        this.setlistaProdutos();
        await Swal.fire("Excluido com Sucesso!", "Produto " + produto.nome , "success");
        this.atualizaTablaProdutos();
    },

    atualizaTablaProdutos : function(){
        this.getlistaProdutos();
        aux = "";
        this.listaProdutos.forEach((produto, index)=>{
            aux += PegaTabelinha(produto);
        })
        document.getElementById("tbodyId").innerHTML = aux;
    },

    getProdutosAtivos: function(){
        this.getlistaProdutos();
        return this.listaProdutos.filter(produto => produto.ativo === true);
    }

};

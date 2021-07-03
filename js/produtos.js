const btn_cadastro = document.getElementById("btn_cadastro");
const btn_salvar = document.getElementById("btn_salvar");
const md_produto = new bootstrap.Modal(document.getElementById("md_cadastro"));
const Swal = 

cProduto.atualizaTablaProdutos();

btn_cadastro.addEventListener("click", () => {
    document.getElementById("inpCodigo").value = cProduto.getUltimoCodigo();
});

btn_salvar.addEventListener("click", async () => {
    const formOk = cProduto.validadorCadastro();
    if (formOk) {
        const produto = new Produto(
            parseInt(document.getElementById("inpCodigo").value),
            document.getElementById("inpNome").value,
            document.getElementById("inpUnidade").value,
            parseFloat(document.getElementById("inpQuantidade").value),
            document.getElementById("inpBarra").value,
            document.getElementById("inpAtivo").checked
        );
        cProduto.salvarProduto( produto );
        alert("Sucesso!")
        cProduto.atualizaTablaProdutos();
        md_produto.hide();
        cProduto.resetCamposProdutos();
    } else {
        alert("Campos Obrigatorios: "+
        "Nome, Unidade e Quantidade")
    }
});



const btn_cadastro = document.getElementById("btn_cadastro");
const btn_salvar = document.getElementById("btn_salvar");
const md_produto = new bootstrap.Modal(document.getElementById("md_cadastro"));

btn_cadastro.addEventListener("click", () => {
    document.getElementById("inpCodigo").value = cProduto.getUltimoCodigo();
});

btn_salvar.addEventListener("click", async () => {
    const formOk = cProduto.validadorCadastro();
    if (formOk) {
        await Swal.fire("Sucesso", "Cadastrado com Sucesso!", "success");
        md_produto.hide();
        cProduto.resetCamposProdutos();
    } else {
        Swal.fire({
            icon: "error",
            title: "Campos Obrigatorios",
            text: "Nome, Unidade e Quantidade",
        });
    }
});

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

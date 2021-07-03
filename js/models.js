class Produto {
    constructor(
        codigo,
        nome,
        unidade,
        quantidade,
        codigo_barra,
        ativo
    ) {
        this.codigo = codigo;
        this.nome = nome;
        this.unidade = unidade;
        this.quantidade = quantidade;
        this.codigo_barra = codigo_barra;
        this.ativo = ativo;
    }
}

class Compra {
    constructor(
        codigo,
        nome,
        unidade,
        quantidade,
        codigo_barra,
        ativo,
        quantidade_comprada,
        coletado
    ){
        this.codigo = codigo;
        this.nome = nome;
        this.unidade = unidade;
        this.quantidade = quantidade;
        this.codigo_barra = codigo_barra;
        this.ativo = ativo;
        this.quantidade_comprada = quantidade_comprada;
        this.coletado = coletado;
    }
}

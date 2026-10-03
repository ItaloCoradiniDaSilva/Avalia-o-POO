import { Fornecedor } from "./Fornecedor.js";

export class Produto {
    #descricao;
    #precoCompra;
    #precoVenda;
    #qtdEstoque;
    #vetVendasMensais;
    #fornecedor;
    #totalVendasAno;

    constructor(_descricao, _precoCompra, _precoVenda, _qtdEstoque, _vetVendasMensais = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], _fornecedor = undefined){
        this.#descricao = _descricao;
        this.#precoCompra = _precoCompra;
        this.#precoVenda = _precoVenda;
        this.#qtdEstoque = _qtdEstoque;
        if (_vetVendasMensais.length == 12) {
            this.#vetVendasMensais = _vetVendasMensais;
        }
        if (_fornecedor != undefined && _fornecedor instanceof Fornecedor) {
            this.#fornecedor = _fornecedor;
        }
        this.#totalVendasAno = 0;
    }

    //---------Métodos Getters---------
    get descricao(){
        return this.#descricao;
    }

    get precoCompra(){
        return this.#precoCompra;
    }

    get precoVenda(){
        return this.#precoVenda;
    }

    get qtdEstoque(){
        return this.#qtdEstoque;
    }

    get vetVendasMensais(){
        return this.#vetVendasMensais.slice();
    }

    get fornecedor(){
        return this.#fornecedor;
    }

    get totalVendasAno(){
        let totalVendasAno = 0;
        for (let i = 0; i < this.#vetVendasMensais.length; i++) {
                totalVendasAno += this.#vetVendasMensais[i];
            }
        
        return this.#totalVendasAno = totalVendasAno;
    }

    //---------Métodos Setters---------
    set descricao(descricao){
        this.#descricao = descricao;
    }

    set precoCompra(precoCompra){
        this.#precoCompra = precoCompra.toFixed(2);
    }

    set precoVenda(precoVenda){
        this.#precoVenda = precoVenda.toFixed(2);
    }

    set qtdEstoque(qtdEstoque){
        this.#qtdEstoque = qtdEstoque;
    }

    set vetVendasMensais(vetVendasMensais){
        if (vetVendasMensais.length == 12) {
            this.#vetVendasMensais = vetVendasMensais;
        }
    }

    alterarVendaMes(mes, qtdVendas) {
        this.#vetVendasMensais[mes - 1] = qtdVendas;
    }
    
    toString(){
        return ("Descrição:" + this.#descricao +
                "\nPreço de Compra: R$" + this.#precoCompra +
                "\nPreço de Venda: R$" + this.#precoVenda +
                "\nQuantidade em Estoque: " + this.#qtdEstoque +
                "\nVendas Mensais do Ano: " + this.#vetVendasMensais +
                "\nFornecedor: " + this.#fornecedor.razaoSocial +
                "\nCNPJ: " + this.#fornecedor.cnpj
        )
    }

stringify() {
    return JSON.stringify({
        descricao: this.#descricao,
        precoCompra: Number(this.#precoCompra),
        precoVenda: Number(this.#precoVenda),
        qtdEstoque: Number(this.#qtdEstoque),
        vetVendasMensais: this.#vetVendasMensais,
        fornecedor: this.#fornecedor.cnpj
    });
}
} 
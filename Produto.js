import { Fornecedor } from "./Fornecedor.js";

export class Produto {
    #descricao;
    #precoCompra;
    #precoVenda;
    #qtdEstoque;
    #vetVendasMensais;
    #fornecedor;

    constructor(_descricao, _precoCompra, _precoVenda, _qtdEstoque, _vetVendasMensais, _fornecedor){
        this.#descricao = _descricao;
        this.#precoCompra = _precoCompra.toFixed(2);
        this.#precoVenda = _precoVenda.toFixed(2);
        this.#qtdEstoque = _qtdEstoque;
        this.#vetVendasMensais = _vetVendasMensais;
        if (_fornecedor != undefined && _fornecedor instanceof Fornecedor) {
            this.#fornecedor = _fornecedor;
        }
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
        return this.#vetVendasMensais.splice();
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
        this.#vetVendasMensais = vetVendasMensais;
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

    stringify(){
        return '\n{' + 
                '\n\t"descricao" : "' + this.#descricao + '" ,' + 
                '\n\t"precoCompra" : "' + this.#precoCompra + '" ,' +
                '\n\t"precoVenda" : "' + this.#precoVenda + '" ,' +
                '\n\t"qtdEstoque" : "' + this.#qtdEstoque + '" ,' +
                '\n\t"vetVendasMensais" : "' + this.#vetVendasMensais + '" ,' +
                '\n\t"fornecedor" : "' + this.#fornecedor.cnpj + '"' +
                '\n}'; 
    }
}
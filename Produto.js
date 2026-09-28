import { Fornecedor } from "./Fornecedor.js";

export class Produto {
    #descricao;
    #preco;
    #qtdEstoque;
    #vetVendasMensais;
    #fornecedor;

    constructor(_descricao, _preco, _qtdEstoque, _vetVendasMensais, _fornecedor){
        this.#descricao = _descricao;
        this.#preco = _preco.toFixed(2);
        this.#qtdEstoque = _qtdEstoque;
        this.#vetVendasMensais = _vetVendasMensais;
        if (_fornecedor != undefined && _fornecedor instanceof Fornecedor) {
            this.#fornecedor = _fornecedor;
        }
    }

    toString(){
        return ("Descrição:" + this.#descricao +
                "\nPreço: R$" + this.#preco +
                "\nQuantidade em Estoque: " + this.#qtdEstoque +
                "\nVendas Mensais do Ano: " + this.#vetVendasMensais +
                "\nFornecedor: " + this.#fornecedor.razaoSocial +
                "\nCNPJ: " + this.#fornecedor.cnpj
        )
    }

    get descricao(){
        return this.#descricao;
    }

    get preco(){
        return this.#preco;
    }

    get qtdEstoque(){
        return this.#qtdEstoque;
    }

    get vetVendasMensais(){
        return this.#vetVendasMensais;
    }

    set descricao(descricao){
        this.#descricao = descricao;
    }

    set preco(preco){
        this.#preco = preco.toFixed(2);
    }

    set qtdEstoque(qtdEstoque){
        this.#qtdEstoque = qtdEstoque;
    }

    set vetVendasMensais(vetVendasMensais){
        this.#vetVendasMensais = vetVendasMensais;
    }
}

//TESTES UTILIZANDO CONSOLE LOG

const produto1 = new Produto("Coca Cola 600ml", 8, 24, [12, 3, 4]);
const produto2 = new Produto("Pasta de dente Colgate", 5, 11, [1, 5, 0]);
const produto3 = new Produto("Batata chips Ruffles", 12, 39, [12, 8, 21]);

//Utilizando o método toString em um objeto
console.log(produto1.toString());

//Conferindo o valor de um atributo através do método get
console.log(produto2.descricao);

//Alterando valor do atributo preco através do método set
console.log(produto3.toString()); //Mostrando valor antes da alteração
produto3.preco = 15;
console.log(produto3.preco);
console.log(produto3.toString()); //Mostrando valor após a alteração
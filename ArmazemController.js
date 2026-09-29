import { Fornecedor } from "./Fornecedor.js";
import { Produto } from "./Produto.js";

export class ArmazemController {
    #vetProdutos;
    #vetFornecedores;

    constructor(){
        this.#vetProdutos = [];
        this.#vetFornecedores = [];
    }

    carregarDados() {
    }

    //---------Métodos para Fornecedor---------
    cadastrarFornecedor(_razaoSocial, _cnpj, _telefone, _endereco, _creditoDisponibilizado) {
        let fornecedor = this.#consultarFornecedor(_cnpj);
        if (fornecedor == undefined) {
            this.#vetFornecedores.push(new Fornecedor(_razaoSocial, _cnpj, _telefone, _endereco, _creditoDisponibilizado));
            return true;
        }
        return false;
    }

    excluirFornecedor(cnpj) {
        let fornecedor = this.consultarFornecedor(cnpj);

        if (fornecedor != undefined) {
            let index = this.#vetFornecedores.indexOf(fornecedor);
            this.#vetFornecedores.splice(index, 1);
            return true;
        }
        return false;
    }

    alterarFornecedor(_razaoSocial, _cnpj, _telefone, _endereco, _creditoDisponibilizado) {
        let fornecedor = this.#consultarFornecedor(_cnpj);
        if (fornecedor != undefined) {
            fornecedor.razaoSocial = _razaoSocial;
            fornecedor.cnpj = _cnpj;
            fornecedor.telefone = _telefone;
            fornecedor.endereco = _endereco;
            fornecedor.creditoDisponibilizado = _creditoDisponibilizado;
            return true;
        }
        return false;
    }

    #consultarFornecedor(cnpj){
        return this.#vetFornecedores.find(
            fornecedor => fornecedor.cnpj === cnpj
        );
    }

    listarFornecedores(){
        var vetObjLiteraisFornecedores = [];
        this.#vetFornecedores.forEach(fornecedor => {
            vetObjLiteraisFornecedores.push({
                razaoSocial: fornecedor.razaoSocial,
                cnpj: fornecedor.cnpj,
                telefone: fornecedor.telefone,
                endereco: fornecedor.endereco,
                creditoDisponibilizado: fornecedor.creditoDisponibilizado
            });
        });
        return vetObjLiteraisFornecedores;
    }

    filtrarFornecedoresPorCredito(minCredito) {
        var vetObjLiteraisFornecedores = [];
        this.#vetFornecedores.forEach(fornecedor => {
            if (fornecedor.creditoDisponibilizado >= minCredito) {
                vetObjLiteraisFornecedores.push({
                    razaoSocial: fornecedor.razaoSocial,
                    cnpj: fornecedor.cnpj,
                    telefone: fornecedor.telefone,
                    endereco: fornecedor.endereco,
                    creditoDisponibilizado: fornecedor.creditoDisponibilizado
                });
            }
        });
        return vetObjLiteraisFornecedores;
    }

    //---------Métodos para Produto---------
    cadastrarProduto(_descricao, _precoCompra, _precoVenda, _qtdEstoque, _vetVendasMensais, _fornecedor) {
        let produto = this.#consultarProduto(_descricao);
        if (produto == undefined) {
            this.#vetProdutos.push(new Produto(_descricao, _precoCompra, _precoVenda, _qtdEstoque, _vetVendasMensais, _fornecedor));
            return true;
        }
        return false;
    }

    #consultarProduto(descricao) {
        return this.#vetProdutos.find(
            produto => produto.descricao === descricao
        );
    }

    excluirProduto(descricao) {
        let produto = this.#consultarProduto(descricao);
        if (produto != undefined) {
            let index = this.#vetProdutos.indexOf(produto);
            this.#vetProdutos.splice(index, 1);
            return true;
        }
        return false;
    }

    alterarProduto(_descricao, _precoCompra, _precoVenda, _qtdEstoque, _vetVendasMensais, _fornecedor) {
        let produto = this.#consultarProduto(_descricao);
        if (produto != undefined) {
            produto.descricao = _descricao;
            produto.precoCompra = _precoCompra;
            produto.precoVenda = _precoVenda;
            produto.qtdEstoque = _qtdEstoque;
            produto.vetVendasMensais = _vetVendasMensais;
            produto.fornecedor = _fornecedor;
            return true;
        }
        return false;
    }

    alterarVendaMes(_descricao, _mes, _qtdVendas) {
        let produto = this.#consultarProduto(_descricao);
        if (produto != undefined) {
            produto.vetVendasMensais[_mes - 1] = _qtdVendas;
            return true;
        }
        return false;
    }

    comprarProduto(_descricao, _qtdComprada, _precoCompra = 0, _precoVenda = 0, _fornecedor = "") {
        let produto = this.#consultarProduto(_descricao);
        if (produto != undefined) {
            produto.qtdEstoque += _qtdComprada;
            if (_fornecedor !== "") {
                let fornecedor = this.#consultarFornecedor(_fornecedor.cnpj);
                if (fornecedor !== undefined) {
                    produto.fornecedor = _fornecedor;
                } else {
                    return resultado = 2; // Fornecedor não encontrado
                }
            }
            if (_precoCompra !== 0) {
                produto.precoCompra = _precoCompra;
            }
            if (_precoVenda !== 0) {
                produto.precoVenda = _precoVenda;
            }
            let totalCompra = produto.precoCompra * _qtdComprada;
            if (totalCompra > produto.fornecedor.creditoDisponibilizado) {
                return resultado = 3; // Crédito insuficiente
            }
            return resultado = 0; // Compra realizada com sucesso
        }
        return resultado = 1; // Produto não encontrado
    }


}
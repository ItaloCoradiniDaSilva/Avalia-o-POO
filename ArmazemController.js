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
        let fornecedor = this.consultarFornecedor(_cnpj);
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
            this.#vetFornecedores.splice((index -1), 1);
            return true;
        }
        return false;
    }

    alterarFornecedor(_razaoSocial, _cnpj, _telefone, _endereco, _creditoDisponibilizado) {
        let fornecedor = this.#consultarFornecedor(_cnpj);
        if (fornecedor != undefined) {
            fornecedor.razaoSocial = _razaoSocial;
            fornecedor.cnpj = _cnpj;
            fornecedor._telefone = _telefone;
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
}
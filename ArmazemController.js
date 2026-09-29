import { Fornecedor } from "./Fornecedor.js";
import { Produto } from "./Produto.js";

export class ArmazemController {
    #vetProdutos;
    #vetFornecedores;

    constructor(){
        this.#vetProdutos = [];
        this.#vetFornecedores = [];
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
            this.#vetFornecedores.splice(index, 1);
            return true;
        }
        return false;
    }

    alterarFornecedor(_razaoSocial, _cnpj, _telefone, _endereco, _creditoDisponibilizado) {
        let fornecedor = this.consultarFornecedor(_cnpj);
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

    consultarFornecedor(cnpj){
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
                let fornecedor = this.consultarFornecedor(_fornecedor.cnpj);
                if (fornecedor !== undefined) {
                    produto.fornecedor = _fornecedor;
                } else {
                    return 2; // Fornecedor não encontrado
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
                return 3; // Crédito insuficiente
            }
            return 0; // Compra realizada com sucesso
        }
        return 1; // Produto não encontrado
    }

    venderProduto(_descricao, _qtdVendida) {
        let produto = this.#consultarProduto(_descricao);
        if (produto != undefined) {
            if (_qtdVendida > produto.qtdEstoque) {
                return {estoqueAtual: produto.qtdEstoque,
                        codigo: undefined}; // Estoque insuficiente
            }
            produto.qtdEstoque -= _qtdVendida;
            return {estoqueAtual: produto.qtdEstoque,
                    codigo: "SUCESSO",
                    totalVenda: _qtdVendida * produto.precoVenda}; // Venda realizada com sucesso
        }
        return {estoqueAtual: 0,
                codigo: "PRODUTO_NAO_ENCONTRADO"}; // Produto não encontrado
    }

    consultarTotalVendasAno(_descricao) {
        let produto = this.#consultarProduto(_descricao);
        if (produto != undefined) {
            let totalVendasAno = 0;

            for (let i = 0; i < produto.vetVendasMensais.length; i++) {
                totalVendasAno += produto.vetVendasMensais[i];
            }
            return {totalVendas: totalVendasAno,
                    descricao: produto.descricao
            };
        }
    }

    consultarFaturamentoMes(_mes) {
        let faturamentoMes = 0;
        this.#vetProdutos.forEach(produto => {
            faturamentoMes += produto.vetVendasMensais[_mes - 1] * produto.precoVenda;
        });
        return faturamentoMes;
    }

    listarProdutos() {
        var vetObjLiteraisProdutos = [];
        this.#vetProdutos.forEach(p => {
            vetObjLiteraisProdutos.push({
                descricao: p.descricao,
                precoCompra: p.precoCompra,
                precoVenda: p.precoVenda,
                qtdEstoque: p.qtdEstoque,
                cnpjForn: p.fornecedor !== undefined ? p.fornecedor.cnpj : "",
                nomeForn: p.fornecedor !== undefined ? p.fornecedor.razaoSocial : "",
                totalAno: p.totalVendasAno
            });
        });
        return vetObjLiteraisProdutos;
    }

    listarTabelaVendasAnual(){
        var vetObjLiteraisProdutos = [];
        this.#vetProdutos.forEach(p => {
            vetObjLiteraisProdutos.push({
                descricao: p.descricao,
                vendasMensais: p.vetVendasMensais,
                totalAno: p.totalVendasAno
            });
        });
        return vetObjLiteraisProdutos;
    }

    listarProdutosFornecedor(cnpj) {
        var vetObjLiteraisProdutos = [];
        this.#vetProdutos.forEach(produto => {
            if (produto.fornecedor.cnpj === cnpj) {
                vetObjLiteraisProdutos.push({
                    descricao: produto.descricao,
                    precoCompra: produto.precoCompra,
                    precoVenda: produto.precoVenda,
                    qtdEstoque: produto.qtdEstoque,
                    vetVendasMensais: produto.vetVendasMensais,
                    cnpjForn: produto.fornecedor.cnpj,
                    nomeForn: produto.fornecedor.razaoSocial,
                    totalAno: produto.totalVendasAno
                });
            }
        });
        return vetObjLiteraisProdutos;
    }

    //---------Métodos para Carregar e Salvar Dados---------
    
    carregarDados() {
        let vetProdutosSalvos = [];
        let vetFornecedoresSalvos = [];
        
        if (localStorage.hasOwnProperty("fornecedoresSalvos")) {
            let strJSONVetFornecedores = localStorage.getItem("fornecedoresSalvos");
            vetFornecedoresSalvos = JSON.parse(strJSONVetFornecedores);
        }
        if (vetFornecedoresSalvos.length > 0) {
            vetFornecedoresSalvos.forEach((objLitFornecedor) => {
                this.#vetFornecedores.push(new Fornecedor(objLitFornecedor.razaoSocial, objLitFornecedor.cnpj, objLitFornecedor.telefone, objLitFornecedor.endereco, objLitFornecedor.creditoDisponibilizado));
            });
        } else {
            this.#vetFornecedores = [
                new Fornecedor("Fornecedor 1", "12.345.678/0001-90", "(11)99999-9999", "Endereço 1", 10000.0),
                new Fornecedor("Fornecedor 2", "98.765.432/0001-90", "(22)88888-8888", "Endereço 2", 15000.0)
            ];
        }
        if (localStorage.hasOwnProperty("produtosSalvos")) {
            let strJSONVetProdutos = localStorage.getItem("produtosSalvos");
            vetProdutosSalvos = JSON.parse(strJSONVetProdutos);
        }
        if (localStorage.hasOwnProperty("fornecedoresSalvos")) {
            let strJSONVetFornecedores = localStorage.getItem("fornecedoresSalvos");
            vetFornecedoresSalvos = JSON.parse(strJSONVetFornecedores);
        }
        if (vetProdutosSalvos.length > 0) {
            vetProdutosSalvos.forEach((objLitProduto) => {
                let objFornecedor = this.#vetFornecedores.find((fornecedor) =>
                    fornecedor.cnpj == objLitProduto.fornecedor.cnpj
                );
                if (objFornecedor != undefined) {
                    this.#vetProdutos.push(new Produto(objLitProduto.descricao, objLitProduto.precoCompra, objLitProduto.precoVenda, objLitProduto.qtdEstoque, objLitProduto.vetVendasMensais, objFornecedor));
                }
            });
        } else {
            this.#vetProdutos = [
                new Produto("Produto 1", 10.0, 15.0, 100, [5, 15, 12, 3, 8, 10, 14, 18, 20, 25, 30, 35], this.#vetFornecedores[0]),
                new Produto("Produto 2", 20.0, 25.0, 50, [2, 6, 9, 12, 15, 18, 22, 26, 30, 35, 40, 45], this.#vetFornecedores[1])
            ];
        }
    }
      
    salvarLocalStorage() {
        if (this.#vetProdutos.length > 0) {
            var strJSONVetProdutos = "[" + this.#vetProdutos[0].stringify();
            for (let i = 1; i < this.#vetProdutos.length; i++) {
                strJSONVetProdutos += "," + this.#vetProdutos[i].stringify();
            }
            strJSONVetProdutos += "\n]";

            localStorage.setItem("produtosSalvos", strJSONVetProdutos)
        }

        if (this.#vetFornecedores.length > 0) {
            var strJSONVetFornecedores = "[" + this.#vetFornecedores[0].stringify();
            for (let i = 1; i < this.#vetFornecedores.length; i++) {
                strJSONVetFornecedores += "," + this.#vetFornecedores[i].stringify();
            }
            strJSONVetFornecedores += "\n]";

            localStorage.setItem("fornecedoresSalvos", strJSONVetFornecedores)
        }
    }
}

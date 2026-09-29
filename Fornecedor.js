export class Fornecedor {
    #razaoSocial;
    #cnpj;
    #telefone
    #endereco;
    #creditoDisponibilizado;

    constructor(_razaoSocial, _cnpj, _telefone, _endereco, _creditoDisponibilizado){
        this.#razaoSocial = _razaoSocial;
        this.#cnpj = _cnpj;
        this.#telefone = _telefone;
        this.#endereco = _endereco;
        this.#creditoDisponibilizado = _creditoDisponibilizado.toFixed(2);
    }   

    /*-------MÉTODOS GETTERS-------*/
    get razaoSocial(){
        return this.#razaoSocial;
    }

    get cnpj(){
        return this.#cnpj;
    }

    get telefone(){
        return this.#telefone;
    }

    get endereco(){
        return this.#endereco;
    }

    get creditoDisponibilizado(){
        return this.#creditoDisponibilizado;
    }


    /*-------MÉTODOS SETTERS-------*/
    set razaoSocial(razaoSocial){
        this.#razaoSocial = razaoSocial;
    }

    set cnpj(cnpj){
        this.#cnpj = cnpj;
    }

    set telefone(telefone){
        this.#telefone = telefone;
    }

    set endereco(endereco){
        this.#endereco = endereco;
    }

    set creditoDisponibilizado(creditoDisponibilizado){
        this.#creditoDisponibilizado = creditoDisponibilizado.toFixed(2);
    }


    toString(){
        return ("Razão Social: " + this.#razaoSocial +
                "\nCNPJ: " + this.#cnpj +
                "\nTelefone: " + this.#telefone +
                "\nEndereço: " + this.#endereco +
                "\nCrédito Disponibilizado: R$" + this.#creditoDisponibilizado
        )
    }
    
    stringify(){
        return '\n{' + 
                '\n\t"razaoSocial" : "' + this.#razaoSocial + '" ,' + 
                '\n\t"cnpj" : "' + this.#cnpj + '" ,' +
                '\n\t"telefone" : "' + this.#telefone + '" ,' +
                '\n\t"endereco" : "' + this.#endereco + '" ,' +
                '\n\t"creditoDisponibilizado" : "' + this.#creditoDisponibilizado + '"' +
                '\n}'; 
    }
}
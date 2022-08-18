class ValidaCpf{
    constructor(cpf_enviado){
        Object.defineProperty(this, 'cpfLimpo',{
            writable:false,
            enumerable:false,
            configurable:false,
            value:cpf_enviado.replace(/\D+/g, ''),
        });
    }
    esequencia(){
        return this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo;
    }
    criaDigito(cpfParcial){
        const cpfArray = Array.from(cpfParcial);

        let regressivo = cpfArray.length + 1;
        const total = cpfArray.reduce((ac, val)=>{
            ac+=(regressivo * Number(val));
            regressivo--;
            return ac;
        },0)
        let digito = 11 -(total % 11);
        return digito > 9 ? 0:String(digito);
    }
    valida(){
        if(typeof this.cpfLimpo === 'undefined') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.esequencia()) return false;

        const cpfParcial = this.cpfLimpo.slice(0,-2);
        const digitoum = this.criaDigito(cpfParcial);
        const digitodois = this.criaDigito(cpfParcial + digitoum);

        const novoCpf = cpfParcial + digitoum + digitodois;

        return novoCpf === this.cpfLimpo;
    }
}

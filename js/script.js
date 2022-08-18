class ValidaFormulario{
    constructor(){
        this.formulario = document.querySelector('.formulario');

        this.eventos();
    }
    eventos(){
        this.formulario.addEventListener('submit', e =>{
            this.handleSubmit(e);
        });//arrow function não permite alterações no this
    }

    handleSubmit(e){
        e.preventDefault();
        const camposValidos = this.isValid();
        const senhasValidas = this.passwordsIsValid();

        if(camposValidos && senhasValidas){
            alert('formulario enviado.')
            this.formulario.submit();
        }
    }

    passwordsIsValid(){
        let valid = true;

        const senha = this.formulario.querySelector('#senha1')
        const repetirSenha = this.formulario.querySelector('#senha2');

        if(senha.value !== repetirSenha.value){
            valid = false;
            this.createError(senha, 'Campos senha e repetir senha precisa ser iguais')
            this.createError(repetirSenha, 'Campos senha e repetir senha precisa ser iguais')
        }
        if(senha.value.length >= 6 || senha.value.length <= 12){
            valid = false;
            this.createError(senha, 'Senha precisa esta entre 6 e 12 caracteres');
        }
        return valid;
    }
    isValid(){
        let valid = true;//flag

        for(let errorText of this.formulario.querySelectorAll('.text-error')){//serve para evitar que a mensagem se repita.
            errorText.remove();
        }
        for(let campo of this.formulario.querySelectorAll('.validar')){//cada laço retorna um campo
            let label = campo.previousElementSibling.innerText;//seleciona o elemento irmão anterior e pega seu texto
            if(!campo.value){
                this.createError(campo, `Campo "${label}" não pode estar em branco`);
                valid = false;
            }
            if(campo.classList.contains('cpf')){
                if(!this.validaCPF(campo)) valid = false;
            }
            if(campo.classList.contains('usuario')){
                if(!this.validaUsuario(campo)) valid = false;
            }
        }
        return valid;
    }
    validaUsuario(campo){
        const usuario = campo.value;
        let validUser = true;
        if(usuario.length > 12 || usuario.length < 3){
            this.createError(campo,'usuário precisa ter entre 3 e 12 caracteres');
            validUser = false;
        }
        if(!usuario.match(/[a-zA-Z0-9]+/g)){
            this.createError(campo,'usuário precisa conter apenas letras e/ou numéros');
            validUser = false;
        }
        return true;
    }
    validaCPF(campo){
        const cpf = new ValidaCpf(campo.value);
        if(!cpf.valida()){
            this.createError(campo, 'CPF inválido');
            return false;
        }
        return true;
    }
    createError(campo, msg){
        const div = document.createElement('div');//cria um elemento div
        div.innerHTML = msg;//adiciona a msg no elemento
        div.classList.add('text-error');//adiciona uma classe ao elemento
        campo.insertAdjacentElement('afterend', div);//adiciona a div no elemento adjacente(depois do campo);

    }

}
const valida = new ValidaFormulario();
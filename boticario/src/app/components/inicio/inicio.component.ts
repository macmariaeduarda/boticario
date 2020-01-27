import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  loginForm: FormGroup;
  cadastroForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
) {
}

  ngOnInit() {
    //validação dos dados inseridos pelo usuário nos campos de login
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
    //validação dos dados inseridos pelo usuário nos campos de cadastro
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required], [(cpf: String) => this.validarCPF(cpf)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      confirmarSenha: ['', [Validators.required], [() => this.confirmarSenha()]]
    });
  }

  /*função que verifica se todos os campos do login estão válidos, caso estejam,
   a função que permite logar o usuário é chamada*/
   submitLogin() {
    if(this.loginForm.valid){
      this.validarLogin(this.loginForm);
    } else {
      alert("Vc n preencheu tudo ou preencheu errado");
    }
   }

   /*função que verifica se todos os campos do cadastro estão válidos, caso estejam,
   a função que permite finalizar o cadastro do usuário é chamada*/
   submitRegister() {
    if(this.cadastroForm.valid){
      this.validarCadastro(this.cadastroForm);
    } else {
      alert('User form register is not valid!!')
    }
   }

   //função para a validação do campo de CPF
  validarCPF(cpfForm) {
    let promise = new Promise((resolve, reject) => {
        var cpf = cpfForm.value.replace(/\D/g, '');
        var soma;
        var resto;
    
        soma = 0;
        if(cpf == "00000000000"){
            reject("CPF inválido");
        }
         
        for(let i=1; i<=9; i++){
            soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
       
        if((resto == 10) || (resto == 11)){
            resto = 0;
        }
        if (resto != parseInt(cpf.substring(9, 10))){
          reject("CPF inválido");
        }
       
        soma = 0;
        for (let i = 1; i <= 10; i++){
            soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
       
        if ((resto == 10) || (resto == 11)){
            resto = 0;
        }
        if (resto != parseInt(cpf.substring(10, 11))){
          reject("CPF inválido");
        }
        resolve();
    });
    return promise;
  }

  /*função que verifica se os dados inseridos nos campos de login pertencem a algum usuário
  já registrado e se eles correspondem aos dados presentes no registro*/
  validarLogin(loginForm){
    let login = loginForm.value;
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    usuarios.map(usuario => {
      if (usuario.email == login.email && usuario.senha == login.senha) {
        localStorage.setItem('usuarioAtual', JSON.stringify(usuario));
      }
    });
    if (localStorage.getItem('usuarioAtual')) {
      console.log('login ok');
      this.router.navigate(['compras']);
    } else {
      alert("Usuário ou senha inválidos!");
    }
  }

  /*função que verifica se os dados inseridos nos campos de cadastro já estão presentes no registro de
  algum usuário, caso não estejam, o cadastro é realizado*/
  validarCadastro(cadastroForm){
    let usuario = {
      nome: cadastroForm.value.nome,
      cpf: cadastroForm.value.cpf,
      email: cadastroForm.value.email,
      senha: cadastroForm.value.senha
    };
    var usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if(usuarios.length > 0){
      usuarios.map(usuarioCadastrado => {
        if(usuarioCadastrado.email == usuario.email || usuarioCadastrado.cpf == usuario.cpf){
          alert("Usuário já cadastrado.");
        } else {
          usuarios.push(usuario);
          localStorage.setItem('usuarios', JSON.stringify(usuarios));
          alert("Usuário cadastrado com sucesso!");
        }
      });
    } else {
      usuarios.push(usuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      alert("Usuário cadastrado com sucesso!");
    }
  }

  /*função que verifica se o conteúdo inserido nos campos "senha" e "confirmar senha"
  são iguais*/
  confirmarSenha(){
    let promise = new Promise((resolve, reject) => {
      let senha = (<HTMLInputElement>document.getElementById('senha')).value;
      let confirmarSenha = (<HTMLInputElement>document.getElementById('confirmarSenha')).value;

      if (senha == confirmarSenha){
        resolve();
      } else {
        reject("Senhas não conferem.");
      }
    });
    return promise;
  }

}


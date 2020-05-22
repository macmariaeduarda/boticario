import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  getNome(){
    var usuario = JSON.parse(localStorage.getItem('usuarioAtual'));
    var nomeCompleto = usuario.nome.split(' ');
    return nomeCompleto[0];
  }

  getEmail(){
    var usuario = JSON.parse(localStorage.getItem('usuarioAtual'));
    var email = usuario.email;
    return email;
  }

}

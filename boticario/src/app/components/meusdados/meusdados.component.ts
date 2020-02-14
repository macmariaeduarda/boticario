import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meusdados',
  templateUrl: './meusdados.component.html',
  styleUrls: ['./meusdados.component.css']
})
export class MeusdadosComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    this.getNome();
    this.getEmail();

  }

  getNome(){
    var usuario = JSON.parse(localStorage.getItem('usuarioAtual'));
    var nomeCompleto = usuario.nome.split(' ');
    document.querySelector('#nome').textContent = nomeCompleto[0];
  }

  getEmail(){
    var usuario = JSON.parse(localStorage.getItem('usuarioAtual'));
    var email = usuario.email;
    document.querySelector('#email').textContent = email;
  }

}

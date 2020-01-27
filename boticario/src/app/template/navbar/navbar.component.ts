import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

  //função que permite que o usuário logado saia da sua conta e retorne até a página inicial
  sair(){
    localStorage.removeItem('usuarioAtual');
    this.router.navigate(['inicio']);
  }

}

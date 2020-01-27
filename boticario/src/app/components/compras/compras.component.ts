import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.inserirNome();
    this.carregarCompras();
  }

  //função que permite exibir a mensagem de "Bem-vindo" acompanhada do nome do usuário logado
  inserirNome(){
    var usuario = JSON.parse(localStorage.getItem('usuarioAtual'));
    var nomeCompleto = usuario.nome.split(' ');
    document.querySelector('#welcome').textContent = "Bem-vindo, " + nomeCompleto[0];
  }

  //função para exibir na tabela os dados das compras anteriormente cadastradas
  carregarCompras(){
    var compras = JSON.parse(localStorage.getItem('compras'));
    compras.map(compra => {
      document.querySelector('#tabelaCompras').innerHTML += (`
        <tr>
          <td>${compra.cod}</td>
          <td>R$ ${compra.valor}</td>
          <td>${compra.data}</td>
          <td>${compra.cashbackPercent * 100}%</td>
          <td>R$ ${compra.cashbackValor}</td>
          <td>${compra.status}</td>
          ${this.validarBotoes(compra.status) /*chamada da função para exibição dos botões de excluir e editar */} 
        </tr>
      `);
    });
  }

  //função que exibe e ativa os botões de "excluir" e "editar" nas compras cujo status é "Em validção"
  validarBotoes(status){
    if(status == "Em validação"){
      return `<td>
      <input type="image" width="30" height="30" class="botaoEditar" src="../../assets/editar.svg" />
    </td>
    <td>
      <input type="image" width="30" height="30" src="../../assets/excluir.svg" />
    </td>`;
    } else {
      return `<td></td><td></td>`;
    }
  }

}

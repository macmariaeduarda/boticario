import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  
  closeResult: string;
  criarForm: FormGroup;
  editarForm: FormGroup;
  isEditar: Boolean = true;
  compras: any;

  constructor(
    private modalService: NgbModal, 
    private formBuilder: FormBuilder,
    private form_Builder: FormBuilder
  ) { }

  ngOnInit() {

    this.inserirNome();
    this.compras = JSON.parse(localStorage.getItem('compras'));
  }

   //função que permite exibir a mensagem de "Bem-vindo" acompanhada do nome do usuário logado
   inserirNome(){
    var usuario = JSON.parse(localStorage.getItem('usuarioAtual'));
    var nomeCompleto = usuario.nome.split(' ');
    document.querySelector('#welcome').textContent = "Bem-vindo, " + nomeCompleto[0];
  }

  totalCashback() {
      let total = this.compras.reduce((accumulator, compra) => accumulator += compra.cashbackValor,0);
      return total;
  }

  converterCashback(totalConvertido) {
    return new Intl.NumberFormat('br-PT', { style: 'currency', currency: 'BRL' }).format(totalConvertido);
  }

  //função para exibição do modal com o formulário de criação de uma nova compra
  modalCriar(content){

    this.criarForm = this.formBuilder.group({
      codigo: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      data: ['', [Validators.required]]
    });

    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.salvarCompra(this.criarForm);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //função para exibição do modal que permite e edição do formulário de dados da compra
  modalEditar(contentEdit,compra){

    this.editarForm = this.form_Builder.group({
      codigo: [compra.cod, [Validators.required]],
      valor: [compra.valor, [Validators.required]],
      data: [compra.data, [Validators.required]]
    });

    this.modalService.open(contentEdit,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.salvarCompra(this.editarForm);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

   //função para salvar os dados da compra inseridos no modal
   salvarCompra(form){
    if(form.valid){
      let compra = {
        cod: form.value.codigo,
        valor: form.value.valor,
        data: form.value.data,
        cashbackPercent: 0.1,
        cashbackValor: 0.1 * form.value.valor,
        status: "Em validação"
      };
      var compras = JSON.parse(localStorage.getItem('compras'));
      if(compras){
        compras.push(compra);
        localStorage.setItem('compras', JSON.stringify(compras));
        window.location.reload();
      } else {
        var arrayCompras = [compra];
        localStorage.setItem('compras', JSON.stringify(arrayCompras));
        window.location.reload();
      }
    } else {
      alert("Erro ao salvar a compra");
    }
  }

  //função para fechar o modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }  

  //função para excluir a compra
  private excluirCompra(compraDeletar){
    var newCompras = this.compras.filter(compra => compra.cod != compraDeletar.cod);
    this.compras = newCompras;
    localStorage.setItem('compras', JSON.stringify(this.compras));

  }

  //função de conversão de formato da data
  converterData(data: String){
    let split = data.split('-');
    return `${split[2]}/${split[1]}/${split[0]}`;
  }

}

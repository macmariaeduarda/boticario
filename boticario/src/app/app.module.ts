import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AppRoutingModule }     from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ComprasComponent } from './components/compras/compras.component';
import { DevComponent } from './components/dev/dev.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

//definição das rotas para que seja possível navegar entre as páginas
const appRoutes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'compras', component: ComprasComponent},
  { path: 'dev', component: DevComponent},
  { path: 'usuario', component: UsuarioComponent }
  
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ComprasComponent,
    DevComponent,
    NavbarComponent,
    UsuarioComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    [
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      )
    ]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

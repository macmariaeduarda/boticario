import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AppRoutingModule }     from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SobreComponent } from './components/sobre/sobre.component';
import { MeusdadosComponent } from './components/meusdados/meusdados.component';
import { ComprasComponent } from './components/compras/compras.component';
import { CashbackComponent } from './components/cashback/cashback.component';
import { DevComponent } from './components/dev/dev.component';
import { NavbarComponent } from './template/navbar/navbar.component';

const appRoutes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'compras', component: ComprasComponent},
  { path: 'cashback', component: CashbackComponent},
  { path: 'dev', component: DevComponent},
  { path: 'meusdados', component: MeusdadosComponent }
  
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SobreComponent,
    MeusdadosComponent,
    ComprasComponent,
    CashbackComponent,
    DevComponent,
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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

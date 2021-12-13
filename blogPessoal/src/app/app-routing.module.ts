import { TemaComponent } from './tema/tema.component';
import { InicioComponent } from './inicio/inicio.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path:"", redirectTo: "login", pathMatch: "full"},

  {path:"login", component: LoginComponent},
  {path:"cadastrar", component: CadastrarComponent},

  {path:"inicio", component: InicioComponent},
  {path:"tema", component: TemaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

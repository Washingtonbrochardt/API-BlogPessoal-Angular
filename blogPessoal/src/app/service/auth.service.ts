import { environment } from './../../environments/environment.prod';
import { Usuario } from './../model/Usuario';
import { UserLogin } from './../model/UserLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  entrar(userLogin:UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('https://blogmeublog.herokuapp.com/usuarios/logar', userLogin)
  }
  cadastrar(usuario:Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://blogmeublog.herokuapp.com/usuarios/cadastrar', usuario)
  }
  logado(){
    let ok = false

    if(environment.token != ''){
      ok = true
    }

    return ok
  }
}

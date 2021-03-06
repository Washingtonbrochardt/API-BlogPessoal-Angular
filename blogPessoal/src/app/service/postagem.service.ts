import { Observable } from 'rxjs';
import { Postagem } from './../model/Postagem';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  getAllPostagens(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>("http://localhost:8080/postagens", this.token)
  }

  postPostagem(postagem:Postagem): Observable<Postagem>{
    return this.http.post<Postagem>("http://localhost:8080/postagens", postagem, this.token)
  }
}

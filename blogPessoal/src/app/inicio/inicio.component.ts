import { AuthService } from './../service/auth.service';
import { Usuario } from './../model/Usuario';
import { Tema } from './../model/Tema';
import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { Postagem } from './../model/Postagem';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem:Postagem = new Postagem

  tema:Tema = new Tema()
  listaTemas:Tema[]
  idTema:number

  usuario: Usuario = new Usuario
  idUsuario= environment.id

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    public authService: AuthService,
    private temaService: TemaService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      alert("Sua seção expirou, faça o login novamente.")
      this.router.navigate(['/login'])
    }
    this.getAllTemas()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp:Tema[])=>{
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema=resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id= this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=> {
      this.postagem = resp
      alert("Postagem realizada com sucesso!")
    })
  }

}

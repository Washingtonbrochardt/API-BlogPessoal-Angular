import { environment } from './../../../environments/environment.prod';
import { AuthService } from './../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from './../../model/Usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario:Usuario=new Usuario()
  idUsuario:number
  confirmarSenha:string;
  tipoUser:string;


  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      // alert("Sua seção expirou, faça o login novamente.")
      this.router.navigate(['/login'])
    }

    this.authService.refreshToken()
    this.idUsuario= this.route.snapshot.params["id"]
    this.findByIdUsuario(this.idUsuario)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }
  tipoUsuario(event: any){
    this.tipoUser = event.target.value
  }

  atualizar(){
    this.usuario.tipo=this.tipoUser

    if(this.usuario.senha != this.confirmarSenha){
        alert('As senhas estao incorretas.')
    }else{
      console.log(this.usuario)
      this.authService.atualizar(this.usuario).subscribe((resp: Usuario )=> {
        this.usuario= resp
        this.router.navigate(['/inicio'])
        alert("Usuario atualizado com sucesso, faça o login novamente")
        environment.token=""
        environment.nome=""
        environment.foto=""
        environment.id=0
        this.router.navigate(["/login"])
      } )
    }
  }
  

  findByIdUsuario(id:number){
    this.authService.getByIdUsuario(id).subscribe((resp:Usuario)=>{
      this.usuario=resp
    })
  }

}

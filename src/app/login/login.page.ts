import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';

import { RepAudio } from 'src/app/clases/rep-audio';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo:string;
  pass:string
  usuarios: Observable<any[]>;
  lista:any[]
  rep:RepAudio = new RepAudio()

  constructor(firestore: AngularFirestore, private route: Router, private vibration : Vibration) {
    this.usuarios = firestore.collection('usuarios').valueChanges();
    this.usuarios.subscribe(usuarios => this.lista = usuarios, error => console.log(error))
  }
  ngOnInit() {
    this. limpiarErrores();
    this.loading()
    
  }

  limpiarErrores(){
    $("#errorUser").attr('hidden', "true")
    $("#errorEmail").attr('hidden', "true")
    $("#errorPass").attr('hidden', "true")
  }

   registrar(){
    this.correo = $("#correo").val();
    this.pass = $("#pass").val();
    if(this.isEmail(this.correo)){
      if(this.isPassword(this.pass)){
        let flag = false;
        for (let usuario of this.lista){
          if(usuario.correo == this.correo && usuario.clave == this.pass){
            flag=true;
            localStorage.setItem('perfil', usuario.perfil)
            this.loading();
            setTimeout(()=>{
              
              if(usuario.perfil == 'admin'){
                this.route.navigate(['home']);
              }
              else{
                this.route.navigate(['home-usuarios']);
              }
            }, 2000);
            break;
          }
        }
        if (!flag) {
          this.vibration.vibrate([100,100,100]);
            //$("#errorUser").removeAttr("hidden");
            $(".errores").fadeIn();
            $(".error-mensaje").addClass("error-password");
            this.rep.reproducir('../../assets/audio/silbato.mp3');
            

            setTimeout(()=>{
              $(".errores").fadeOut();
              $(".error-mensaje").removeClass("error-password");
            }, 2000);
        }
      }
      else{
        this.vibration.vibrate([100,100,100]);
        //$("#errorPass").removeAttr("hidden");
        $(".errores").fadeIn();
        $(".error-mensaje").addClass("error-password");
        this.rep.reproducir('../../assets/audio/silbato.mp3');


            setTimeout(()=>{
              $(".errores").fadeOut();
              $(".error-mensaje").removeClass("error-password");
            }, 2000);
      }
    }
    else{
      this.vibration.vibrate([100,100,100]);
      $(".errores").fadeIn();
        $(".error-mensaje").addClass("error-mail");
        this.rep.reproducir('../../assets/audio/silbato.mp3');


            setTimeout(()=>{
              $(".errores").fadeOut();
              $(".error-mensaje").removeClass("error-mail");
            }, 2000);
    }
    
  }

  focus(){
    $(".pelotita-focus").addClass(".pelotita-active");
  }

  blur() {
    $(".pelotita-focus").removeClass(".pelotita-active");
  }

  loading(){
    $(".backdrop").removeAttr('hidden')
    $("#spinner").removeAttr('hidden')
    setTimeout(() => {
      $(".backdrop").attr('hidden', 'true');
      $("#spinner").attr('hidden', "true")
    }, 2000);
  }

  completar(value){
    this.limpiarErrores()
    for (let usuario of this.lista) {
      if(usuario.correo == value){
        $("#correo").val(usuario.correo);
        $("#pass").val(usuario.clave);
        break;
      }
    }
  }

  isEmail(email:string) : boolean
  {
    let regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}.){1,125}[A-Z]{2,63}$/i;

    let retorno : boolean = false;

    if(regex.test(email))
    {
        retorno = true;
    }

    return retorno;
  }

  isPassword(pass:string){
    let flag = false;
    if(pass.length >= 4 && pass.length <= 20)
      flag = true;

      return flag;
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { RepAudio } from '../clases/rep-audio';

@Component({
  selector: 'app-home-usuarios',
  templateUrl: './home-usuarios.page.html',
  styleUrls: ['./home-usuarios.page.scss'],
})
export class HomeUsuariosPage implements OnInit {

  rep:RepAudio = new RepAudio()

  constructor(private route:Router) { }

  ngOnInit() {
  }

  cerrar(){
    this.loading();
    setTimeout(()=>{
      this.route.navigate(['login']);
    }, 2000);
  }

  loading(){
    $("#casa-usu").removeAttr('hidden')
    $(".backdrop").removeAttr('hidden');
    setTimeout(() => {
      $(".backdrop").attr('hidden', 'true');
      $("#casa-usu").attr('hidden', "true")
    }, 2000);
  }

  navegar(ruta:string){
    this.loading();
    setTimeout(() => {
      this.route.navigate([ruta])
      
    }, 2000);
  }

}

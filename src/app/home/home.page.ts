import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private route: Router) {}

    cerrar(){
    this.loading();
    setTimeout(()=>{
      this.route.navigate(['login']);
    }, 2000);
  }

  loading(){
    $("#casa").removeAttr('hidden')
    $(".backdrop").removeAttr('hidden');
    setTimeout(() => {
      $(".backdrop").attr('hidden', 'true');
      $("#casa").attr('hidden', "true")
    }, 2000);
  }

  navegar(rute:string){
    this.loading();
    setTimeout(() => {
      this.route.navigate([rute])
    }, 2000);
  }

}

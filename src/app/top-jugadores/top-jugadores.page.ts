import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-top-jugadores',
  templateUrl: './top-jugadores.page.html',
  styleUrls: ['./top-jugadores.page.scss'],
})
export class TopJugadoresPage implements OnInit {

  parti;
  listaJugadores;
  ordenado = []

  constructor(public route:Router, private firestore:AngularFirestore) {
    this.parti = firestore.collection('jugadores').valueChanges();
    this.parti.subscribe(jugadores => this.listaJugadores = jugadores, error => console.log(error))
    setTimeout(() => {
      this.ordenar()
    }, 2000);
   }

  ngOnInit() {
  }

  navegar(rute:string){
    let usu = localStorage.getItem('perfil')
    this.loading();
    setTimeout(() => {
      if(usu != 'admin')
        this.route.navigate([rute+'-usuarios'])      
      else
      this.route.navigate([rute])
    }, 2000);
  }

  ordenar()
  {
    this.listaJugadores.sort((a,b) => {
      return (a.ganados - b.ganados);
    })

    this.listaJugadores.reverse();

    for(let i = 0; i < 5; i++)
    {
      this.ordenado.push(this.listaJugadores[i]);
    }
  }

  loading(){
    $("#spinTop").removeAttr('hidden')
    $(".backdrop").removeAttr('hidden');
    setTimeout(() => {
      $(".backdrop").attr('hidden', 'true');
      $("#spinTop").attr('hidden', "true")
    }, 2000);
  }

}

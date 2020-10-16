import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { AngularFirestore } from 'angularfire2/firestore';
import {storage} from 'firebase'

@Component({
  selector: 'app-listado-partidos',
  templateUrl: './listado-partidos.page.html',
  styleUrls: ['./listado-partidos.page.scss'],
})
export class ListadoPartidosPage implements OnInit {
  listaPartidos;
  parti
  mostrar
  partiCollection

  constructor(public route:Router, public firestore:AngularFirestore) {
    this.partiCollection = this.firestore.collection('partidos',ref => { return ref.orderBy('fecha', 'desc')});
    this.parti = this.partiCollection.valueChanges()
    this.parti.subscribe(partidos => this.listaPartidos = partidos, error => console.log(error))
    this.traerFotos()
    setTimeout(() => {
      this.mostrar = this.listaPartidos
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

  traerFotos(){
    const imagenes = storage().ref("metegol");
      imagenes.listAll().then((imagenes) => {
      let listadoImagenes:any = imagenes.items;

      for(let foto of listadoImagenes)
      {
        for(let item of this.listaPartidos)
        {
          if('metegol/'+item.foto == foto.location.path)
          {
            storage().ref().child(foto.location.path).getDownloadURL().then((dato) =>{
              item.foto = dato;
            });
          }
        }

      }
    });
  }

  loading(){
    $("#spinListado").removeAttr('hidden')
    $(".backdrop").removeAttr('hidden');
    setTimeout(() => {
      $(".backdrop").attr('hidden', 'true');
      $("#spinListado").attr('hidden', "true")
    }, 2000);
  }


}

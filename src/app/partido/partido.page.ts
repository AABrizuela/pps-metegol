import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {AngularFireStorage} from '@angular/fire/storage'
import { FirebaseService } from 'src/app/servicios/firebase.service';
import {storage} from 'firebase'


@Component({
  selector: 'app-partido',
  templateUrl: './partido.page.html',
  styleUrls: ['./partido.page.scss'],
})
export class PartidoPage implements OnInit {

  jug;
  listaJugadores;
  contUno = 0;
  contDos = 0;
  partidos;
  url
  listadoImagenes


  constructor(private servicio:FirebaseService,private storage:AngularFireStorage ,public route:Router, public firestore:AngularFirestore, private camera:Camera) {
   }

  ngOnInit() {
        this.jug = this.firestore.collection('jugadores').valueChanges();
    this.jug.subscribe(jugadores => this.listaJugadores = jugadores, error => console.log(error))
    this.partidos = this.firestore.collection('partidos');

  }
  
  navegar(rute:string){
    this.loading();
    setTimeout(() => {
      this.route.navigate([rute]) 

    }, 2000);
  }

  finalizar(){
    $("#desea").removeAttr('hidden');
  }

  sum(value:string){
    if(value == 'uno'){
      this.contUno++;
      $("#puntoJugUno").text(this.contUno)
    }
    else if(value == 'dos'){
      this.contDos++;
      $("#puntoJugDos").text(this.contDos)
    }
  }

  rest(value:string){
    if(value == 'uno'){
      this.contUno--;
      $("#puntoJugUno").text(this.contUno)
    }
    else if(value == 'dos'){
      this.contDos--;
      $("#puntoJugDos").text(this.contDos)
    }
  }
  async traerURL(lugar)
  {
  
      const imagenes = storage().ref('metegol');
      await imagenes.listAll().then((imagenes) => {
      this.listadoImagenes = imagenes.items;

      for(let item of this.listadoImagenes)
      {
        if(item.location.path == 'metegol/'+lugar)
        storage().ref().child(item.location.path).getDownloadURL().then((dato) =>{
          this.url = dato;
          console.log(dato)
        })
        break;
      }

    })
    
  }

  async crear(value:string){
    this.validarJugadores()

    let partido
    let numeroUno = $("#jugUno").val()
    let numeroDos = $("#jugDos").val()

    switch(value){
      
      case 'foto':
        let foto
        let options: CameraOptions = {
          quality: 50,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          sourceType: this.camera.PictureSourceType.CAMERA,
          correctOrientation: true
        }

        await this.camera.getPicture(options).then((imageData) => {
          foto = 'data:image/jpeg;base64,'+imageData          
         }, (err) => {
          console.log('err: '+err);
         });
         
        await this.servicio.uploadImage(foto, `${numeroUno} vs ${numeroDos}`)
        let ruta = numeroUno+ ' vs '+ numeroDos
        partido = { fecha: $("#fecha").val(), 
                    resultado: $("#puntoJugUno").text() + ' - ' + $("#puntoJugDos").text(),
                    jugadorUno: numeroUno,
                    jugadorDos: numeroDos,
                    foto: `${numeroUno} vs ${numeroDos}`
                  }
                  console.log(partido)
        break;
      case 'no':
        partido = { fecha: $("#fecha").val(), 
                    resultado: $("#puntoJugUno").text() + ' - ' + $("#puntoJugDos").text(),
                    jugadorUno: numeroUno,
                    jugadorDos: numeroDos,
                    foto: ''
                  }
        break;
    }

    if(this.contUno > this.contDos){
      let ganador
      for (let jugador of this.listaJugadores) {
        if(numeroUno == jugador.nombre){
          ganador = jugador
          break;
        }
      }
      ganador.ganados++
      this.servicio.update(ganador)
    }
    else if(this.contDos > this.contUno){
      let ganador
      for (let jugador of this.listaJugadores) {
        if(numeroUno == jugador.nombre){
          ganador = jugador
          break;
        }
      }
      ganador.ganados++
      this.servicio.update(ganador)
    }

    this.partidos.add(partido);
    this.navegar('home')

    $("#desea").attr('hidden', true)
  }

  validarJugadores(){
    console.log('validar')
    let jugadorUno = $("#jugUno").val()
    let jugadorDos = $("#jugDos").val()
    let flagUno = false
    let flagDos = false

    for (let jugador of this.listaJugadores) {
      if(jugadorUno == jugador.nombre){
        flagUno = true
      }
      else if(jugadorDos == jugador.nombre){
        flagDos = true;
      }
    }

    if(!flagUno){    
      console.log('uno')
      this.servicio.crearDoc(jugadorUno)
      this.jug = this.firestore.collection('jugadores').valueChanges();
      this.jug.subscribe(jugadores => this.listaJugadores = jugadores, error => console.log(error))  
    }

    if(!flagDos){    
      console.log('dos')

      this.servicio.crearDoc(jugadorDos)
      this.jug = this.firestore.collection('jugadores').valueChanges();
      this.jug.subscribe(jugadores => this.listaJugadores = jugadores, error => console.log(error))  
    }
  }

  loading(){
    $("#spinPartido").removeAttr('hidden')
    $(".backdrop").removeAttr('hidden');
    setTimeout(() => {
      $(".backdrop").attr('hidden', 'true');
      $("#spinPartido").attr('hidden', "true")
    }, 2000);
  }

}

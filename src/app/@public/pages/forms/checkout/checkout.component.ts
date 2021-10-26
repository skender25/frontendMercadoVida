import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { IMeData } from '@shop/core/interfaces/session.interface';
import {Cartservice} from '../../../core/services/cartservice.ts.service';
import { ICart } from '@shop/core/components/shopping-cart/shopping-cart.interface';
import {MailService} from '../../../../@core/services/mail.service';
import { IMail } from '@core/interfaces/mail.interface';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
 ubicacionPed = '';
 numTelef = '';
 fechaEntrega;
 fechaActual = new Date (Date.now());
 meData: IMeData;
 cart: ICart;
 pedidoCompletado = false;
  constructor(private auth: AuthService, private router: Router, private shoppingCart: Cartservice, private mailService: MailService) {
    this.auth.accessVar$.subscribe((data: IMeData) => {
      if (!data.status){
        this.router.navigate(['/login']);
        return;
      }
      this.meData = data;
    });
    this.shoppingCart.itemsVar$.subscribe(( data: ICart) => {
      if ( data !== undefined && data !== null ){
        this.cart = data;
    }
    });
   }

  ngOnInit(): void {
    this.auth.start();
    this.cart = this.shoppingCart.initialize();
    }
    formatoCel(valor){
        let newVal = valor;
        newVal = valor.replace(/\D/g, '');
        if (newVal.length === 0) {
          newVal = '';
        } else if (newVal.length <= 5) {
          newVal = newVal.replace(/^(\d{0,4})(\d{0,7})/, '$1-$2');
        } else if (newVal.length <= 9) {
          newVal = newVal.replace(/^(\d{0,4})(\d{0,7})/, '$1-$2');
        } else {
          newVal = newVal.substring(0, 7);
          newVal = newVal.replace(/^(\d{0,4})(\d{0,7})/, '$1-$2');
        }
        console.log('valor ', newVal);
        this.numTelef = newVal;
    }
    validarFecha(fechaSeleccionada){
      const fechaSelecc = new Date(fechaSeleccionada);
      // tslint:disable-next-line:max-line-length
      if ( this.fechaActual.getDate() > fechaSelecc.getDate() && this.fechaActual.getMonth() >= fechaSelecc.getMonth() ){
        basicAlert(TYPE_ALERT.INFO, 'No pueden realizar entregas en el día seleccionado');
        this.fechaEntrega = '';
      } else {
        /* este proceso se hace por si la compu donde se corre este programa tiene reloj seteado a 24h*/
        const horaActualEstandar = this.fechaActual.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        if (fechaSelecc.getDay() === 3 || fechaSelecc.getDay() === 6 ){
        // tslint:disable-next-line:max-line-length
          if ( this.fechaActual.getDay() === 2 && Number(horaActualEstandar[0]) >= 5 && horaActualEstandar.substr(1) === ' PM' && fechaSelecc.getDay() === 3 ){
            basicAlert(TYPE_ALERT.INFO, 'No es posible realizar el pedido en tan poco tiempo');
            this.fechaEntrega = '';
        // tslint:disable-next-line:max-line-length
        }else if ( this.fechaActual.getDay() === 5  && this.fechaActual.getHours() >= 5 && horaActualEstandar.substr(1) === ' PM' && fechaSelecc.getDay() === 6){
            basicAlert(TYPE_ALERT.INFO, 'No es posible realizar el pedido en tan poco tiempo');
            this.fechaEntrega = '';
        }
        }else{
          basicAlert(TYPE_ALERT.INFO, 'No pueden realizar entregas en el día seleccionado');
          this.fechaEntrega = '';
        }
      }
    }
    enviarNotificaciones(f: any) {
      if (this.numTelef === '' || this.fechaEntrega === undefined || this.ubicacionPed === ''){
        basicAlert(TYPE_ALERT.WARNING, 'Debe de llenar todos los campos del formulario para poder proceder');
      } else{
        const fechaEntr = new Date(this.fechaEntrega);
        const dia = (fechaEntr.getDay() === 3) ? 'miercoles' : 'sabado';
        const mes = this.obtenerMes(fechaEntr.getMonth());
        const min = (fechaEntr.getMinutes() < 10 ) ? '0' + fechaEntr.getMinutes().toString() : fechaEntr.getMinutes();
        const horaEntregaEstandar = fechaEntr.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        let productosPedido = 'El pedido contiene los siguientes productos:';
        this.cart.products.forEach((product) => {
          productosPedido += `<li> ${product.name} - ${product.qty} uds - precio: ₡ ${product.price} </li>`;
        });
        const  mail: IMail = {
          to: this.meData.user.email,
          subject: 'Creación exitosa de pedido',
          html: `Estimado cliente ${this.meData.user.name} ${this.meData.user.lastname}, este correo tiene como proposito el informarle que su pedido a sido creado de manera corecta,
          la entrega se realizará el día  ${dia} ${fechaEntr.getDate()} de ${mes} del ${fechaEntr.getFullYear()} a la/s ${horaEntregaEstandar[0]}:${min} ${horaEntregaEstandar.substr(2)}, en ${this.ubicacionPed}, el mismo tiene un precio de ₡ ${this.cart.total}.<br>
          <ul> ${productosPedido}</ul> </br>
          Muchas gracias por elegirnos.`
        };
        this.mailService.send(mail).pipe(take(1)).subscribe();
        // se envia correo al cliente primero, despues a la compañia
        mail.subject = 'Nuevo Pedido ';
        mail.to = 'mercadovidabd@gmail.com';
        mail.html = `<p> El cliente ${this.meData.user.name} ${this.meData.user.lastname}, ha realizado un pedido,
        el mismo debe de ser entregado el día ${dia} ${fechaEntr.getDate()} de ${mes} del ${fechaEntr.getFullYear()} a la/s ${horaEntregaEstandar[0]}:${min} ${horaEntregaEstandar.substr(2)} , en ${this.ubicacionPed}, número de contacto del cliente: ${this.numTelef},  precio del pedido ₡ ${this.cart.total}. </p> <br>
        <ul> ${productosPedido}</ul> </br>`;
        // cuando se ponga en podruccion se debe de descomentar la linea de abajo y eliminar este comentario
        /* this.mailService.send(mail).pipe(take(1)).subscribe();*/
        this.pedidoCompletado = true;
      }
    }
    obtenerMes(numMes){
      let respuesta;
      switch (numMes){
        case  0:
          respuesta = 'enero';
          break;
         case  1:
          respuesta = 'febrero';
          break;
         case  2:
          respuesta = 'marzo';
          break;
         case  3:
          respuesta = 'abril';
          break;
         case  4:
          respuesta = 'mayo';
          break;
         case  5:
          respuesta = 'junio';
          break;
         case  6:
          respuesta = 'julio';
          break;
         case  7:
          respuesta = 'agosto';
          break;
         case  8:
          respuesta = 'setiembre';
          break;
         case  9:
          respuesta =  'octubre';
          break;
         case  10:
          respuesta = 'noviembre';
          break;
         case  11:
          respuesta =  'diciembre';
          break;
      }
      return respuesta;
    }
  }



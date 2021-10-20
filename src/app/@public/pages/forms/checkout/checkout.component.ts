import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { IMeData } from '@shop/core/interfaces/session.interface';
import { UsersService } from '@core/services/users.service';
import {Cartservice} from '../../../core/services/cartservice.ts.service';
import { ICart } from '@shop/core/components/shopping-cart/shopping-cart.interface';
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
  constructor(private auth: AuthService, private router: Router, private userService: UsersService, private shoppingCart: Cartservice) {
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


  enviarNotificaciones(f: any) {
      if (this.numTelef === '' || this.fechaEntrega === undefined || this.ubicacionPed === ''){
        basicAlert(TYPE_ALERT.WARNING, 'Debe de llenar todos los campos del formulario para poder proceder');
      } else{
        const  email = {
          to: this.meData.user.email,
          subject: 'Creación exitosa de pedido',
          html: `Estimado cliente ${this.meData.user.name} ${this.meData.user.lastname}, este correo tiene como proposito el informarle que su pedido a sido creado de manera corecta,
          la entrega se realizará el ${this.fechaEntrega}, en ${this.ubicacionPed}, el mismo tiene un precio de ₡ ${this.cart.total}, muchas gracias por elegirnos.`
        };
        // se envia correo al cliente primero, despues a la compañia
        console.log('result1 ' + this.userService.notificaciones(email));
        email.subject = 'Nuevo Pedido ';
        email.to = 'mercadovidabd@gmail.com';
        email.html = `<p> El cliente ${this.meData.user.name} ${this.meData.user.lastname}, ha realizado un pedido,
        el mismo debe de ser entregado el  ${this.fechaEntrega}, en ${this.ubicacionPed},  precio del pedido ₡ ${this.cart.total}. </p>`;
        console.log('result2 ' + this.userService.notificaciones(email));
      }
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
      /* este proceso se hace por si la compu donde se corre este programa tiene reloj seteado a 24h*/
      const horaActualEstandar = this.fechaActual.toLocaleString('en-US', { hour: 'numeric', hour12: true });
      if (fechaSelecc.getDay() === 3 || fechaSelecc.getDay() === 6 ){
       //   && fechaSelecc.getDay() === 3
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
      }
    }
  }


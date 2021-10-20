import { Component, OnInit } from '@angular/core';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
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
  constructor() { }

  ngOnInit(): void {
    }


  enviarNotificaciones(f: any) {
      if (this.numTelef === '' || this.fechaEntrega === undefined || this.ubicacionPed === ''){
        basicAlert(TYPE_ALERT.WARNING, 'Debe de llenar todos los campos del formulario para poder proceder');
      } else{
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


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
  constructor() { }

  ngOnInit(): void {
    }


  enviarNotificaciones(f: any) {
      console.log(' valor fechaEntrega ', this.fechaEntrega);
      console.log(' valor ubicacionPed ', this.ubicacionPed);
      console.log(' valor numTelef ', this.numTelef);
      if (this.numTelef === '' || this.fechaEntrega === undefined || this.ubicacionPed === ''){
        basicAlert(TYPE_ALERT.WARNING, 'Debe de llenar todos los campos del formulario para poder proceder');
      } else{

      }
    }
}

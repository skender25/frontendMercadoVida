import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  toogleValue= true;
  @Output() toggleChange = new EventEmitter<boolean>();
  

  ///esta funcion se realiza para enviar el estado del toggle ya que es un hijo de admin para heredar
  //asi admin pasa el valor a sidebar y se pude mostrar o no
  toggled(){
    if(this.toogleValue === undefined){
      this.toogleValue = true ;

    }
    this.toogleValue = !this.toogleValue;
    console.log(this.toogleValue);
    this.toggleChange.emit(this.toogleValue);
  }

}

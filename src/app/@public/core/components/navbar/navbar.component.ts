import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { IMeData } from '@shop/core/interfaces/session.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  session: IMeData = {
    status: false
  };
  access = false;
  role: string;
  userLabel = '';
  constructor(private authService: AuthService) {
    this.authService.accessVar$.subscribe((result) => {
      console.log(result.status);
      this.session = result;
      this.access = this.session.status;
      this.role = this.session.user?.Role;
      this.userLabel = `${ this.session.user?.name } ${ this.session.user?.lastname }`;
      console.log(this.role);
    });
  }
  ngOnInit(): void {
  }

  logout() {
    this.authService.resetSession();
  }
  open(){
    console.log('shopping cart open');
  }

}


import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

@Component({
  templateUrl: 'auth.html'
})
export class AuthPage {

  constructor(public navCtrl: NavController) {
    
  }
  goToGetNamePage(){
    this.navCtrl.push(RegisterPage);
  }
  goToLoginPage(){
    this.navCtrl.push(LoginPage);
  }

}

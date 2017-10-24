
import {Component,Injectable} from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {LoginService} from '../../service/login';
import { ListPage } from '../../pages/list/list';

@Injectable()
export class LoginData {
  user_email;
  user_pwd;
    AppId;
    RegistrationId;
    DeviceId;
    Device;
    Authtoken;
} 

@Component({
  templateUrl: 'login.html',
  providers:[LoginData,LoginService],
  //directives: [FormsModule, ReactiveFormsModule]
  
})
export class LoginPage {
  getEmailForm: FormGroup;
  validUser = 'true';
  logins = [];
  Password;
  Email;
 

  constructor(
    public navCtrl: NavController,
    private _loginData : LoginData,
    private _loginService: LoginService,    
    public formBuilder: FormBuilder,
    private loadingCtrl : LoadingController,) {
      this.getEmailForm = formBuilder.group({
        Email: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
        Password: ['', Validators.compose([Validators.maxLength(50), Validators.required])]
  });
  }
  login(event){ 
    this._loginData.user_email =  this.getEmailForm.controls['Email'].value;
    this._loginData.user_pwd = this.getEmailForm.controls['Password'].value;
    
    this._loginService.setLoginData(this._loginData);
    let loader = this.loadingCtrl.create({
      content: "<div class='custom-spinner-container'><div class='custom-spinner-box'></div></div>"
    });
    loader.present();
    this._loginService.login(this._loginData)      
    .subscribe(data => {
      loader.dismiss(); 
      if(data.status=="1")
      {
        this.validUser='true';
        this._loginService.setUserInfo(data); 
        localStorage.setItem("AuthToken",data.status);
        this.navCtrl.setRoot(ListPage);
      }
      else
      {
          this.validUser='false';
          this.Password='';
      } 
    });


  }
}

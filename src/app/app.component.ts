import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';

import { MyPlayerConfigService } from '../service/config';
//import { Device } from '@ionic-native';
@Component({
  templateUrl: 'app.html',
  providers: [ MyPlayerConfigService],
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public _config: MyPlayerConfigService,
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Logout', component: HomePage },
    ];

  }

  initializeApp() { 

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide(); 
          this.init();
    });
  }
  // Here check into app is logged or not
  init(){   
    var authtoken = localStorage.getItem('AuthToken');
    if (authtoken == null || authtoken == '' || authtoken == 'null' || authtoken == undefined || authtoken == 'undefined')
      this.rootPage = RegisterPage;
    else {
        this.rootPage = ListPage;
    }
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  name: string[];
  number: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl:LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.name = ['Peter', 'Park', 'beer', 'Antony', 'sam', 'Shawns',
    'american', 'Rose', 'Milt', 'Mike'];
    this.number = ['9879877895', '9879877895', '9879877895', '9879877895', '9879877895', '9879877895',
    '9879877895', '9879877895', '9879877895', '9879877895'];

    this.items = [];
    for (let i = 1; i < 10; i++) {
      this.items.push({
        title:this.name[i],
        note: this.number[i],
        icon: this.name[Math.floor(Math.random() * this.name.length)]
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
  logout(){
   let loader = this.loadingCtrl.create({
      content: "<div class='custom-spinner-container'><div class='custom-spinner-box'></div></div>"
    });
    loader.present();
    localStorage.setItem("AuthToken",'');
    localStorage.clear();
    setTimeout(() => {
          loader.dismiss();
          window.location.reload(false);
        }, 500); 
    
    

  }
}

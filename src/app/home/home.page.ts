import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Platform, ToastController } from '@ionic/angular';
import Swiper, { Autoplay } from 'swiper';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public swiper: Swiper;
  private url: string = '';
  private randomImages = [];

  constructor(
    private platform: Platform,
    private router: Router,
    private location: Location,
    private toastController: ToastController,
    private file: File
  ) {
    this.url = this.router.url;

    this.platform.backButton.subscribeWithPriority(10, () => {
      // if(this.url === '/') {
      //   App.exitApp();
      // } else if(this.url === 'add-travel') {
      //   this.location.back();
      // } else {
      //   this.router.navigate(['/']);
      //   this.platform.backButton.unsubscribe();
      // }
      this.location.back();
      // this.presentToast();
    });
  }

  ngOnInit() {
    Swiper.use([Autoplay]);

    this.swiper = new Swiper('.swiper', {
      autoplay: {
        delay: 4000,
      },
      loop: true
    });

    try {
      console.log(this.file);
      this.file.listDir(this.file.dataDirectory, './assets/places')
        .then(() => console.log('Directory exists'))
        .catch(err =>
          console.log(`Directory doesn't exist`)
        );
    } catch(err) {
      console.log(err);
    }

    
    

    for(const img of './assets') {
      this.randomImages.push(img);
    }
  }

  // async presentToast() {
  //   const toast = await this.toastController.create({
  //     message: 'This is the toast',
  //     duration: 2000
  //   });
  //   toast.present();
  // }

}

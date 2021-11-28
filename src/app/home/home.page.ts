import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Platform, ToastController } from '@ionic/angular';
import Swiper, { Autoplay } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public swiper: Swiper;
  private url: string = '';
  private homeMessages: string[] = [
    'Has pensado en ir alguna vez a ',
    '¿Te llama la atención? Ven a ',
    'Celebra la vida en ',
  ];

  constructor(
    private platform: Platform,
    private router: Router,
    private location: Location,
    private toastController: ToastController
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
        delay: 5000,
      },
      loop: true
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'This is the toast',
      duration: 2000
    });
    toast.present();
  }

}

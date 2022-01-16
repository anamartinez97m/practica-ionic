import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import Swiper, { Autoplay } from 'swiper';
import { StorageService } from '../services/storage.service';

// const APP_DIRECTORY = Directory.Documents;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public swiper: Swiper;
  private url: string = '';
  private wishlistLength: number = 0;
  private myTravelsLength: number = 0;

  constructor(
    private platform: Platform,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private storage: StorageService
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

    this.storage.get('wishlistLength')
      .then((value) => {
        this.wishlistLength = value;
      });
    this.storage.get('travelsLength')
      .then((value) => {
        this.myTravelsLength = value;
      });
  }

}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import Swiper, { Autoplay } from 'swiper';
import { StorageService } from '../services/storage.service';
import { ThemeService } from '../services/theme.service';
import { TravelsService } from '../services/travels.service';
import { WishListService } from '../services/wishlist.service';

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
    private routerOutlet: IonRouterOutlet,
    private storage: StorageService,
    private wishlistService: WishListService,
    private travelsService: TravelsService,
    private themeService: ThemeService
  ) {
    this.url = this.router.url;

    this.platform.backButton.subscribeWithPriority(10, () => {
      App.exitApp();
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

    this.wishlistService.initializeWishList();
    this.travelsService.initializeContinentsContent();

    this.storage.get('nightMode')
    .then(value => {
      this.themeService.enableNightModeFromStorage(value);
    });
  }

}

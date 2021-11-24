import { Component, OnInit } from '@angular/core';
import Swiper, { Autoplay } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public swiper: Swiper;

  constructor() { }

  ngOnInit() {
    Swiper.use([Autoplay]);

    this.swiper = new Swiper('.swiper', {
      autoplay: {
        delay: 5000,
      },
      loop: true
    });
  }

  

}

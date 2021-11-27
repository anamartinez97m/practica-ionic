import { Component, OnInit } from '@angular/core';
import { DEFAULT_IMG } from 'src/app/global-constants';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.page.html',
  styleUrls: ['./wish-list.page.scss'],
})
export class WishListPage implements OnInit {

  public listToShow: any[] = [];
  public defaultImg = DEFAULT_IMG;
  public modeListIsEnabled: boolean = true;
  public modeMapIsEnabled: boolean = false;

  constructor() {}

  ngOnInit() {
  }

  changeViewMode() {
    if(this.modeListIsEnabled) {
      this.modeListIsEnabled = false;
      this.modeMapIsEnabled = true;
    } else {
      this.modeListIsEnabled = true;
      this.modeMapIsEnabled = false;
    }
  }

}

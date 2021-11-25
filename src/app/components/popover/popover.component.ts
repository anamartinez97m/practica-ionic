import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  public languages: any = [];

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.languages = this.navParams.get('data');
  }

  selectLanguage(event: any) {
    console.log(event);
  }

}

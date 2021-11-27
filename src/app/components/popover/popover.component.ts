import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController, NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  public languages: any = [];

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.languages = this.navParams.get('data');
  }

  selectLanguage(event: any) {
    console.log(event);
    this.popoverController.dismiss(event.element);
  }
}

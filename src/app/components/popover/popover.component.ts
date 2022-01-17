import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  public languages = [];
  private languagesKeys: string[] = [];

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.languages = this.navParams.get('data');
    
    for(const lang of this.languages) {
      this.languagesKeys.push(lang);
    }
  }

  selectLanguage(event: any) {
    this.popoverController.dismiss(event.element);
  }
}

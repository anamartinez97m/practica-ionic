import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}

//translateService.use('en')

/*
translateService.get('HELLO').subscribe(
  value => {
    // value is our translated string
    let alertTitle = value;
  }
)
*/

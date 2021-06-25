import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedCart = [
    { price: 20 },
    { price: 45 },
    { price: 67 },
    { price: 1305 }
  ];

  constructor() {
  }

  changeCurrency(currency: string) {
    debugger;
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyService} from "./services/currency.service";
import {Price} from "./interfaces/price";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  $selectedCart = this.service.$selectedCart;
  commonPrice: number = 0;

  private subs$: Subscription = new Subscription();

  constructor(private service: CurrencyService) {
  }

  set subs(value: Subscription | undefined) {
    this.subs$.add(value);
  }

  ngOnInit() {
    this.calcCommonPrice();
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }

  changeCurrency(currency: string) {
    const selectedCart: Price[] = this.$selectedCart.getValue();

    this.subs = this.service.getCurrency(currency).subscribe((result: number) => {
      const num = Math.round((result + Number.EPSILON) * 100) / 100
      this.$selectedCart.next(selectedCart.reduce((acc: Price[], cur: Price): Price[] => {
        return acc.concat({price: +(cur.price *= result).toFixed(2)});
      }, [] as Price[]));

      this.service.$currency.next(currency);

      this.calcCommonPrice();
    })
  }

  calcCommonPrice() {
    const selectedCart: Price[] = this.$selectedCart.getValue();
    this.commonPrice = selectedCart.reduce((acc: number, cur: Price): number => +(acc += cur.price).toFixed(2), 0)
  }

}

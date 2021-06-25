import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  $currency = new BehaviorSubject('USD');
  $selectedCart = new BehaviorSubject([
    {price: 20},
    {price: 45},
    {price: 67},
    {price: 1305}
  ]);

  constructor(private http: HttpClient) {
  }

  getCurrency(currency: string): Observable<number> {
    const query: string = `${this.$currency.getValue()}_${currency}`;
    return this.http.get(`https://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=002e132009ebe365ab3e`)
      .pipe(map((response: { [key: string]: any }) => response[query]));
  }
}

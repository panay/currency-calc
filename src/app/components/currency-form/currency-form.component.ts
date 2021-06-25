import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyFormComponent implements OnDestroy {
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();

  currencies: {
    value: string;
    label: string;
  }[] = [
    {
      value: 'USD',
      label: '$'
    },
    {
      value: 'EUR',
      label: '€'
    },
    {
      value: 'RUB',
      label: '₽'
    },
    {
      value: 'GBP',
      label: '£'
    },
    {
      value: 'JPY',
      label: '¥'
    }
  ];

  currencyForm: FormGroup = this.fb.group({
    currency: 'USD'
  });

  private subs$: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {
    this.subs = this.currencyForm.get('currency')?.valueChanges.subscribe((currency: string) => {
      this.onChange.emit(currency);
    })
  }

  set subs(value: Subscription | undefined) {
    this.subs$.add(value);
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }
}

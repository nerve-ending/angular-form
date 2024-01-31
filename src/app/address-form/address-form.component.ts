import { Component, Input, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'address-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddressFormComponent,
    },
  ],
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {
  @Input()
  legend: string = '';

  constructor(private fb: FormBuilder) {}

  onTouched = () => {};

  onChangeSub: Subscription = new Subscription();

  form: FormGroup = this.fb.group({
    addressLine1: ['', [Validators.required]],
    addressLine2: ['', [Validators.required]],
    zipCode: ['', [Validators.required]],
    city: ['', [Validators.required]],
  });

  // 表单值发生变化时，把新的值报告给父级
  registerOnChange(fn: any): void {
    // subscribe中，(value) => fn(value)可以简写成fn
    this.onChangeSub = this.form.valueChanges.subscribe((value) => fn(value));
  }

  // 创建this.onChangeSub的目的就是为了这个，在组件销毁时取消订阅
  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

  writeValue(value: any): void {
    if (value) {
      this.form.setValue(value);
    }
  }

  // (blur)="onTouched()"在每个input上写了这句
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}

import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'address-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent {
  @Input()
  legend: string = '';

  constructor(private fb: FormBuilder) {}

  form: FormGroup = this.fb.group({
    addressLine1: ['', [Validators.required]],
    addressLine2: ['', [Validators.required]],
    zipCode: ['', [Validators.required]],
    city: ['', [Validators.required]],
  });
}

import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
  @Input()
  requiredFileType: string = '';
  fileName: string = '';

  fileUploadError: boolean = false;

  uploadProgress: number | null = null;

  onChange = (fileName: string) => {};

  isDisabled: boolean = false;

  fileUploadSuccess: boolean = true;

  onTouched = () => {};

  onValidatorChange = () => {};

  handleClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
  }

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      this.http
        .post('/api/thumbnail-upload', formData, {
          observe: 'events',
          reportProgress: true,
          responseType: 'text',
        })
        .pipe(
          catchError((error) => {
            this.fileUploadError = true;
            return of(error);
          }),
          finalize(() => {
            this.uploadProgress = 100;
          })
        )
        .subscribe((event) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = 100 * (event.loaded / event.total);
          } else if (event.type == HttpEventType.Response) {
            this.onChange(this.fileName);
            this.onValidatorChange();
          }
        });
    }
  }

  writeValue(value: any) {
    this.fileName = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  registerOnValidatorChange(onValidatorChange: () => void): void {
    this.onValidatorChange = onValidatorChange;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (this.fileUploadSuccess) {
      return null;
    }

    let errors: any = {
      这是自定义的错误信息: '111',
      requiredFileType: this.requiredFileType,
    };

    if (this.fileUploadError) {
      errors.uploadFailed = true;
    }

    return errors;
  }
}

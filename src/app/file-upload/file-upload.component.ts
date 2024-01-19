import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { catchError, finalize, of } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
})
export class FileUploadComponent {
  @Input()
  requiredFileType: string = '';
  fileName: string = '';

  fileUploadError: boolean = false;

  uploadProgress: number | null = null;

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
          }
        });
    }
  }
}

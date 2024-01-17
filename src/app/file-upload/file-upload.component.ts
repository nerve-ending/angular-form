import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  @Input()
  requiredFileType: string = '';
  fileName: string = '';

  fileUploadError: boolean = false;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      this.http
        .post('/api/thumbnail-upload', formData)
        .pipe(
          catchError((error) => {
            this.fileUploadError = true;
            return of(error);
          })
        )
        .subscribe();
    }
  }
}

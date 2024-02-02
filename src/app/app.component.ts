import { Component } from '@angular/core';
import {} from '@angular/forms';
import { CreateCourseComponent } from './create-course/create-course.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CreateCourseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {}
}

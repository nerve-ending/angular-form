import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CreateCourseStep1Component } from './create-course-step-1/create-course-step-1.component';
import { CreateCourseStep2Component } from './create-course-step-2/create-course-step-2.component';
import { CreateCourseStep3Component } from './create-course-step-3/create-course-step-3.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'create-course',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    CreateCourseStep1Component,
    CreateCourseStep2Component,
    CreateCourseStep3Component,
  ],
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class CreateCourseComponent {}

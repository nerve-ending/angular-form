import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { CoursesService } from './courses.service';

export function courseTitleValidator(
  courses: CoursesService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return courses.findAllCourses().pipe(
      map((courses: any[]) => {
        const course = courses.find(
          (course: { description: any }) =>
            course.description == control.value.toLowerCase()
        );
        return course ? { titleExists: true } : null;
      })
    );
  };
}

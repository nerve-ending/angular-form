import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';

@Injectable()
export class CoursesService {
  constructor(private http: HttpClient) {}

  findCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${courseId}`);
  }

  findCourseCategories() {
    return this.http
      .get(`/api/course-categories`)
      .pipe(map((res: { [x: string]: any }) => res['categories']));
  }

  findAllCourses(): Observable<Course[]> {
    return this.http
      .get('/api/courses')
      .pipe(map((res: { [x: string]: any }) => res['payload']));
  }

  findAllCourseLessons(courseId: number): Observable<Lesson[]> {
    return this.http
      .get('./api/lessons', {
        params: new HttpParams()
          .set('courseId', courseId)
          .set('pageNumber', '0')
          .set('pageSize', '1000'),
      })
      .pipe(map((res: { [x: string]: any }) => res['payload']));
  }
}

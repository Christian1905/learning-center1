import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Course} from "../../model/course.entity";
import {CourseService} from "../../services/course.service";
import {MatTableDataSource} from '@angular/material/table';
import {NgForOf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [MatCardModule, MatButtonModule, NgForOf, TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  protected courseData!: Course;
  private courseService: CourseService = inject(CourseService);
  protected dataSource!: MatTableDataSource<any>;
  constructor() {
    this.courseData = new Course({});
    this.dataSource = new MatTableDataSource();
    console.log(this.courseData);
  }

  ngOnInit(): void {
    this.getAllCourses();
  }

  private getAllCourses() {
    this.courseService.getAll().subscribe((response: Array<Course>) => {
      this.dataSource.data = response;
    });
  }

}

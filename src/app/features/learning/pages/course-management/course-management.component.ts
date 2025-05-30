import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Course} from "../../model/course.entity";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {CourseService} from "../../services/course.service";
import {CourseCreateAndEditComponent} from "../../components/course-create-and-edit/course-create-and-edit.component";
import {MatIcon} from "@angular/material/icon";
import {NgClass} from "@angular/common";

/**
 * Component responsible for managing courses through a table interface.
 * Provides functionality for viewing, creating, updating, and deleting courses.
 * Features include pagination, sorting, and integrated CRUD operations.
 */
@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [
    CourseCreateAndEditComponent,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderCell,
    MatCell,
    MatIcon,
    MatHeaderRowDef,
    MatRowDef,
    NgClass,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatSortHeader
  ],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit, AfterViewInit {

  //#region Attributes

  /** Current course being created or edited */
  protected courseData!: Course;

  /** Defines which columns should be displayed in the table and their order */
  protected columnsToDisplay: string[] = ['id', 'title', 'description', 'url','actions'];

  /** Reference to the Material paginator for handling page-based data display */
  @ViewChild(MatPaginator, {static: false})
  protected paginator!: MatPaginator;

  /** Reference to the Material sort directive for handling column sorting */
  @ViewChild(MatSort)
  protected sort!: MatSort;

  /** Controls whether the component is in edit mode */
  protected editMode: boolean = false;

  /** Material table data source for managing and displaying course data */
  protected dataSource!: MatTableDataSource<any>;

  /** Service for handling course-related API operations */
  private courseService: CourseService = inject(CourseService);

  //#endregion

  //#region Methods

  /**
   * Initializes the component with default values and creates a new data source
   */
  constructor() {
    this.editMode = false;
    this.courseData = new Course({});
    this.dataSource = new MatTableDataSource();
    console.log(this.courseData);
  }

  /**
   * Lifecycle hook that runs after view initialization.
   * Sets up the Material table's paginator and sort functionality.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Lifecycle hook that runs on component initialization.
   * Loads the initial course data.
   */
  ngOnInit(): void {
    this.getAllCourses();
  }

  /**
   * Handles the edit action for a course
   * @param item - The course to be edited
   */
  protected onEditItem(item: Course) {
    this.editMode = true;
    this.courseData = item;
  }

  /**
   * Handles the delete action for a course
   * @param item - The course to be deleted
   */
  protected onDeleteItem(item: Course) {
    this.deleteCourse(item.id);
  }

  /**
   * Handles the cancellation of create/edit operations.
   * Resets the component state and refreshes the course list.
   */
  protected onCancelRequested() {
    this.resetEditState();
    this.getAllCourses();
  }

  /**
   * Handles the addition of a new course
   * @param item - The new course to be added
   */
  protected onCourseAddRequested(item: Course) {
    this.courseData = item;
    this.createCourse();
    this.resetEditState();
  }

  /**
   * Handles the update of an existing course
   * @param item - The course with updated information
   */
  protected onCourseUpdateRequested(item: Course) {
    this.courseData = item;
    this.updateCourse();
    this.resetEditState();
  }

  /**
   * Resets the component's edit state to its default values.
   * Clears the current course data and exits edit mode.
   */
  private resetEditState(): void {
    this.courseData = new Course({});
    this.editMode = false;
  }

  /**
   * Retrieves all courses from the service and updates the table's data source.
   * Uses CourseService to fetch the data via HTTP.
   */
  private getAllCourses() {
    this.courseService.getAll().subscribe((response: Array<Course>) => {
      this.dataSource.data = response;
    });
  }

  /**
   * Creates a new course using the CourseService.
   * Updates the table's data source with the newly created course.
   */
  private createCourse() {
    this.courseService.create(this.courseData).subscribe((response: Course) => {
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data;
    });
  }

  /**
   * Updates an existing course using the CourseService.
   * Updates the corresponding course in the table's data source.
   */
  private updateCourse() {
    let courseToUpdate = this.courseData;
    this.courseService.update(courseToUpdate.id, courseToUpdate).subscribe((response: Course) => {
      let index = this.dataSource.data.findIndex((course: Course) => course.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    });
  }

  /**
   * Deletes a course using the CourseService.
   * Removes the course from the table's data source.
   * @param id - The ID of the course to delete
   */
  private deleteCourse(id: number) {
    this.courseService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((course: Course) => course.id !== id);
    });
  }

  //#endregion
}

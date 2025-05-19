import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule
  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {
  ticketIdentifier: string = '';
  rating: number = 1;
  message: string = '';
  isSuccess: boolean = false;

  constructor(private ratingService: RatingService) {}

  onSubmit() {
    if (!this.ticketIdentifier || this.rating < 1 || this.rating > 5) {
      return;
    }

    this.ratingService.submitRating(this.ticketIdentifier, this.rating)
      .subscribe(result => {
        this.message = result.message;
        this.isSuccess = result.success;
        if (result.success) {
          this.ticketIdentifier = '';
          this.rating = 1;
        }
      });
  }
}

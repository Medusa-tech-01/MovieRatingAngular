import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-star-rating',
  imports: [NgbRatingModule, CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent implements OnInit{
    @Input() rating: any;
    @Output() ratingChange = new EventEmitter<any>(); // Add the EventEmitter
    @Input() isReadOnly: boolean = false;

    constructor(){}
    ngOnInit(): void {
      
    }

    // Emit the change when the rating is updated
    onRatingChange(newRating: number): void {
      this.rating = newRating;
      this.ratingChange.emit(this.rating); // Emit the change
    }
}

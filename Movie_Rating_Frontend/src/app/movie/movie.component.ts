import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-movie',
  imports: [HeaderComponent, StarRatingComponent, CommonModule, NgbRatingModule, FormsModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent implements OnInit{
  
  id!: number;
  movie: any = {};
  newReview = { author: '', review: '', rating: 0 }; // New review form data
  
  constructor(private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {
    
    this.id = +this.route.snapshot.params['id'];
    this.fetchMovieDetails();
  }


  fetchMovieDetails(): void {
    this.http.get(`http://localhost:5000/api/reviews/${this.id}`).subscribe(
      (data: any) => {
        this.movie = data;
      },
      (error) => {
        console.error('Failed to fetch movie details:', error);
      }
    );
  }

  submitReview(): void {
    if (!this.newReview.author || !this.newReview.review || this.newReview.rating <= 0) {
      alert('Please fill out all fields and provide a valid rating.');
      return;
    }
    this.http
      .post(`http://localhost:5000/api/reviews/add/${this.id}`, this.newReview)
      .subscribe(
        (response: any) => {
          alert(response.message);
          // alert("Review added successfully!");
          this.newReview = { author: '', review: '', rating: 0 }; // Reset form
          this.fetchMovieDetails(); // Refresh reviews
        },
        (error) => {
          console.error('Failed to submit review:', error);
        }
      );
  }
}

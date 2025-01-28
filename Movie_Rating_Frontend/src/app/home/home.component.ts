import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HttpClientModule, CommonModule, NgbRatingModule, StarRatingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  trendingMovies: any = [];
  threatreMovies: any = [];
  popularMovies: any = [];

  constructor(private http: HttpClient, private router: Router){}

  ngOnInit(): void{
    this.getTrendingMovies();
    this.getTheatreMovies();
    this.getPopularMovies();
  }

  getTrendingMovies(): void{
    this.http.get('assets/data/trending-movies.json').subscribe((movies) => {
      this.trendingMovies = movies;
      // console.log(this.trendingMovies)
    });
  }
  getTheatreMovies(): void{
    this.http.get('assets/data/theatre-movies.json').subscribe((movies) => {
      this.threatreMovies = movies;
      // console.log(this.threatreMovies)
    });
  }
  getPopularMovies(): void{
    this.http.get('assets/data/popular-movies.json').subscribe((movies) => {
      this.popularMovies = movies;
      // console.log(this.popularMovies)
    });
  }

  goToMovie(id: number): void{
    this.router.navigate(['movie', id])
  }

  ariaValueText(current: number, max: number): string {
		return `${current.toFixed(1)} out of ${max} hearts`;
	}
}

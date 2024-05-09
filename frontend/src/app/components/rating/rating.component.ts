import { Component } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent{
  rating: Array<boolean>;
  private STARS_NUMBER = 5;
  private currRating = -1;

  constructor() {
    this.rating = new Array<boolean>();
    for (let i = 0; i < this.STARS_NUMBER; i++){
      this.rating.push(false);
    }
  }

  onPointClicked(idx: number): void{
    if (this.currRating === idx){
      for (let i = 0; i < this.STARS_NUMBER; i++){
        this.rating[i] = false;
      }
      this.currRating = -1;
    }
    else{
      for (let i = 0; i <= idx; i++){
        this.rating[i] = true;
      }
      for (let i = idx + 1; i < this.STARS_NUMBER; i++) {
        this.rating[i] = false;
      }
      this.currRating = idx;
    }
  }
}

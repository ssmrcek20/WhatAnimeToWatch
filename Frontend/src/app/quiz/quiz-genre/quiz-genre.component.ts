import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizService } from '../../quiz.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz-genre',
  templateUrl: './quiz-genre.component.html',
  styleUrls: ['./quiz-genre.component.scss']
})
export class QuizGenreComponent implements OnInit {
  formGroup!: FormGroup;
  types!: any[];
  demo: any[] = [
    {
      Id: 43,
      Name: "Josei"
    },
    {
      Id: 15,
      Name: "Kids"
    },
    {
      Id: 42,
      Name: "Seinen"
    },
    {
      Id: 25,
      Name: "Shoujo"
    },
    {
      Id: 27,
      Name: "Shounen"
    }
  ];

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    const storedGenreData = this.quizService.getGenreFormData();

    this.http.get<any[]>('../../../assets/types.json').subscribe(data => {
      this.types = data;
    });

    this.formGroup = this.formBuilder.group({
      selectedGenres: [],
      demographic: {}
    });

    this.formGroup.patchValue({
      selectedGenres: storedGenreData.selectedGenres || [],
      demographic: storedGenreData.demographic || {}
    });
  }

  onSaveAndNext(): void {
    this.quizService.setGenreFormData(this.formGroup.value);

    this.router.navigate(['quiz', 'status']);
  }

  onBack(): void {
    this.router.navigate(['quiz', 'ep-duration']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizService } from '../../quiz.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Genre {
  id: number,
  name: string
}

@Component({
  selector: 'app-quiz-genre',
  templateUrl: './quiz-genre.component.html',
  styleUrls: ['./quiz-genre.component.scss']
})
export class QuizGenreComponent implements OnInit {
  formGroup!: FormGroup;
  genres!: Genre[];

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    const storedGenreData = this.quizService.getGenreFormData();

    this.genres = [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Adventure' },
      { id: 3, name: 'Cars' },
      { id: 4, name: 'Comedy' },
      { id: 5, name: 'Dementia' },
      { id: 6, name: 'Demons' },
    ];
    this.http.get<Genre[]>('https://whatanimetowatch.onrender.com/api/Genres').subscribe({
      next: (data) => {
        this.genres = data;
      },
      error: (error) => {
        console.error('Error fetching genres:', error);
      }
    });

    this.formGroup = this.formBuilder.group({
      selectedGenres: [],
    });

    this.formGroup.patchValue({
      selectedGenres: storedGenreData.selectedGenres || [],
    });
  }

  onSaveAndNext(): void {
    this.quizService.setGenreFormData(this.formGroup.value);

    this.router.navigate(['quiz', 'ep-duration']);
  }

  onBack(): void {
    this.router.navigate(['quiz', 'ep-duration']);
  }

  isNextDisabled(): boolean {
    return !this.formGroup.get('selectedGenres')?.value || this.formGroup.get('selectedGenres')?.value.length === 0;
  }
}

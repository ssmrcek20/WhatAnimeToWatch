import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizService } from '../../quiz.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

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
  isLoading = true;

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private router: Router, private http: HttpClient, private messageService: MessageService) { }

  ngOnInit(): void {
    const storedGenreData = this.quizService.getGenreFormData();

    this.http.get<Genre[]>(environment.backendUrl + '/api/Genres').subscribe({
      next: (data) => {
        this.genres = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Genres couldn't load" });
        this.isLoading = false;
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

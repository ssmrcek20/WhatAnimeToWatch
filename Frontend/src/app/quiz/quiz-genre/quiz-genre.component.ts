import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizService } from '../../quiz.service';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { MessageService } from 'primeng/api';
import { Genre } from '../../interfaces/Genre';

@Component({
  selector: 'app-quiz-genre',
  templateUrl: './quiz-genre.component.html',
  styleUrls: ['./quiz-genre.component.scss']
})
export class QuizGenreComponent implements OnInit {
  formGroup!: FormGroup;
  genres!: Genre[];
  isLoading = true;

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private router: Router, private backendService: BackendService , private messageService: MessageService) { }

  ngOnInit(): void {
    const storedGenreData = this.quizService.getGenreFormData();

    this.getGenres();

    this.formGroup = this.formBuilder.group({
      selectedGenres: [],
    });

    this.formGroup.patchValue({
      selectedGenres: storedGenreData.selectedGenres || [],
    });
  }

  private getGenres() {
    this.backendService.getGenres()
      .then(genres => {
        this.genres = genres;
        this.isLoading = false;
      })
      .catch(error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Genres couldn't load" });
        this.isLoading = false;
      });
  }

  onSaveAndNext(): void {
    this.quizService.setGenreFormData(this.formGroup.value);

    this.router.navigate(['quiz', 'status']);
  }

  onBack(): void {
    this.router.navigate(['quiz', 'ep-duration']);
  }

  isNextDisabled(): boolean {
    return !this.formGroup.get('selectedGenres')?.value || this.formGroup.get('selectedGenres')?.value.length === 0;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizService } from '../../quiz.service';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { MessageService } from 'primeng/api';
import { Studio } from '../../interfaces/Studio';

@Component({
  selector: 'app-quiz-studio',
  templateUrl: './quiz-studio.component.html',
  styleUrls: ['./quiz-studio.component.scss']
})
export class QuizStudioComponent implements OnInit {
  formGroup!: FormGroup;
  studios!: Studio[];
  isLoading = true;

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private router: Router, private backendService: BackendService , private messageService: MessageService) { }

  ngOnInit(): void {
    const storedStudioData = this.quizService.getStudioFormData();

    this.getStudios();

    this.formGroup = this.formBuilder.group({
      selectedStudios: [],
    });

    this.formGroup.patchValue({
      selectedStudios: storedStudioData.selectedStudios || [],
    });
  }

  private getStudios() {
    this.backendService.getStudios()
      .then(studios => {
        this.studios = studios;
        this.isLoading = false;
      })
      .catch(error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Studios couldn't load" });
        this.isLoading = false;
      });
  }

  onSaveAndNext(): void {
    this.quizService.setStudioFormData(this.formGroup.value);

    this.router.navigate(['quiz', 'age-rating']);
  }

  onBack(): void {
    this.router.navigate(['quiz', 'source']);
  }
}

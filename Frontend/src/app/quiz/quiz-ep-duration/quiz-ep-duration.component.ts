import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizService } from '../../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-ep-duration',
  templateUrl: './quiz-ep-duration.component.html',
  styleUrls: ['./quiz-ep-duration.component.scss']
})
export class QuizEpDurationComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    const storedEpDurData = this.quizService.getEpDurFormData();

    this.formGroup = this.formBuilder.group({
      min: 1,
      max: 180,
    });

    this.formGroup.patchValue({
      min: storedEpDurData.min || 1,
      max: storedEpDurData.max || 180,
    });
  }

  selectAllText(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.select();
  }

  onSaveAndNext(): void {
    const formValue = this.formGroup.value;

    if (formValue.min == null) {
      formValue.min = 1;
    }
    if (formValue.max == null) {
      formValue.max = 180;
    }

    this.quizService.setEpDurFormData(formValue);

    this.router.navigate(['quiz', 'type']);
  }

  onBack(): void {
    this.router.navigate(['quiz', 'num-ep']);
  }
}

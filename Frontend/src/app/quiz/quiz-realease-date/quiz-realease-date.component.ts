import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizService } from '../../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-realease-date',
  templateUrl: './quiz-realease-date.component.html',
  styleUrls: ['./quiz-realease-date.component.scss']
})
export class QuizRealeaseDateComponent implements OnInit {
  formGroup!: FormGroup;
  source: string[] = [
    'Winter',
    'Spring',
    'Summer',
    'Fall',
  ];
  minDate = new Date(1950, 0, 1, 0, 0, 0);
  maxDate = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0);

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    const storedRelDateData = this.quizService.getRelDateFormData();

    this.formGroup = this.formBuilder.group({
      season: "",
      years: [this.minDate, this.maxDate],
    });

    this.formGroup.patchValue({
      season: storedRelDateData.season || "",
      years: storedRelDateData.years || [this.minDate, this.maxDate],
    });

    this.checkYear();
  }

  onSaveAndNext(): void {
    const formValue = this.formGroup.value;

    if (formValue.years == null) {
      formValue.years = [this.minDate, this.maxDate];
    }

    this.quizService.setRelDateFormData(formValue);

    this.router.navigate(['quiz', 'source']);
  }

  onBack(): void {
    this.router.navigate(['quiz', 'status']);
  }

  checkYear(): void {
    if (this.formGroup.value.years[1] == null || this.formGroup.value.years[0].getTime() === this.formGroup.value.years[1].getTime()) {
      this.formGroup.get('season')?.enable();
    } else {
      this.formGroup.get('season')?.disable();
    }
  }
}

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
  isMobile = false;

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    const storedRelDateData = this.quizService.getRelDateFormData();

    this.formGroup = this.formBuilder.group({
      startDate: new Date(1960, 0, 1),
      endDate: new Date(),
    });
  
    this.formGroup.patchValue({
      startDate: storedRelDateData.startDate || new Date(1960, 0, 1),
      endDate: storedRelDateData.endDate || new Date(),
    });

    this.updateCalendarProperties(window.innerWidth);
  }

  onSaveAndNext(): void {
    const formValue = this.formGroup.value;
  
    if (formValue.startDate == null) {
      formValue.startDate = new Date(1960, 0, 1);
    }
    if(formValue.endDate == null) {
      formValue.endDate = new Date();
    }

    this.quizService.setRelDateFormData(formValue);
    
    this.router.navigate(['quiz', 'source']);
  }

  onBack(): void {
    this.router.navigate(['quiz', 'status']);
  }

  private updateCalendarProperties(screenWidth: number) {
    if (screenWidth <= 800) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
}

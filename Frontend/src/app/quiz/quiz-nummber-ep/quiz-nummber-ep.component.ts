import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizService } from '../../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-nummber-ep',
  templateUrl: './quiz-nummber-ep.component.html',
  styleUrls: ['./quiz-nummber-ep.component.scss']
})
export class QuizNummberEpComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    const storedNumEpData = this.quizService.getNumEpFormData();

    this.formGroup = this.formBuilder.group({
      min: 0,
      max: 5000,
    });
  
    this.formGroup.patchValue({
      min: storedNumEpData.min || 0,
      max: storedNumEpData.max || 5000,
    });
  }

  onSaveAndNext(): void {
    const formValue = this.formGroup.value;
  
    if (formValue.min == null) {
      formValue.min = 0;
    }
    if(formValue.max == null) {
      formValue.max = 5000;
    }

    this.quizService.setNumEpFormData(formValue);
    
    this.router.navigate(['quiz', 'ep-duration']);
  }

  onBack(): void {
    this.router.navigate(['quiz', 'media']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizService } from '../quiz.service';
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
    const storedMediaTypeData = this.quizService.getMediaTypeFormData();
    
    this.formGroup = this.formBuilder.group({
      tv: storedMediaTypeData?.tv || false,
      ova: storedMediaTypeData?.ova || false,
      movie: storedMediaTypeData?.movie || false,
      special: storedMediaTypeData?.special || false,
      ona: storedMediaTypeData?.ona || false,
      music: storedMediaTypeData?.music || false,
    });
  }

  onSaveAndNext(): void {
    const formValue = this.formGroup.value;
    const anyChecked = Object.values(formValue).some((isChecked) => isChecked);
  
    if (anyChecked) {
      this.quizService.setMediaTypeFormData(formValue);
    } else {
      Object.keys(formValue).forEach((key) => {
        formValue[key] = true;
      });
      this.quizService.setMediaTypeFormData(formValue);
    }
  
    this.router.navigate(['quiz', 'num-ep']);
  }

  onBack(): void {
    this.router.navigate(['quiz', 'media']);
  }
}

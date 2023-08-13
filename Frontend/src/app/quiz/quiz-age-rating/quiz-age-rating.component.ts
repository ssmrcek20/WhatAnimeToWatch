import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { QuizService } from '../../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-age-rating',
  templateUrl: './quiz-age-rating.component.html',
  styleUrls: ['./quiz-age-rating.component.scss']
})
export class QuizAgeRatingComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    const storedAgeRData = this.quizService.getAgeRFormData();

    this.formGroup = this.formBuilder.group({
      g: [],
      pg: [],
      pg13: [],
      r: [],
      rPlus: [],
      rx: [],
    });
    
    const everythingChecked = Object.keys(storedAgeRData).every((key) => storedAgeRData[key].length > 0);
    if (everythingChecked) {
      this.formGroup.patchValue({
        g: [],
        pg: [],
        pg13: [],
        r: [],
        rPlus: [],
        rx: [],
      });
    }
    else{
      this.formGroup.patchValue({
        g: storedAgeRData.g || [],
        pg: storedAgeRData.pg || [],
        pg13: storedAgeRData.pg13 || [],
        r: storedAgeRData.r || [],
        rPlus: storedAgeRData.rPlus || [],
        rx: storedAgeRData.rx || [],
      });
    }
  }

  onSaveAndNext(): void {
    const formValue = this.formGroup.value;
    const anyChecked = Object.keys(formValue).some((key) => formValue[key].length > 0);
  
    if (!anyChecked) {
      const allTrueValues: { [key: string]: string[] } = {};
      Object.keys(formValue).forEach((key) => {
        if(key === 'pg13'){
          allTrueValues[key] = ['pg_13'];
        }
        else if(key === 'rPlus'){
          allTrueValues[key] = ['r+'];
        }
        else{
          allTrueValues[key] = [key];
        }
    });
      this.quizService.setAgeRFormData(allTrueValues);
    }
    else {
      this.quizService.setAgeRFormData(formValue);
    }

    this.router.navigate(['', 'anime-list']);
  }

  onBack(): void {
    this.router.navigate(['quiz', 'studio']);
  }
}

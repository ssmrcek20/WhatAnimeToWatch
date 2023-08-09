import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { QuizService } from '../../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-status',
  templateUrl: './quiz-status.component.html',
  styleUrls: ['./quiz-status.component.scss']
})
export class QuizStatusComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    const storedStatusData = this.quizService.getStatusFormData();

    this.formGroup = this.formBuilder.group({
      finished_airing: [],
      currently_airing: [],
      not_yet_aired: [],
    });
    
    const everythingChecked = Object.keys(storedStatusData).every((key) => storedStatusData[key].length > 0);
    if (everythingChecked) {
      this.formGroup.patchValue({
        finished_airing: [],
        currently_airing: [],
        not_yet_aired: [],
      });
    }
    else{
      this.formGroup.patchValue({
        finished_airing: storedStatusData.finished_airing || [],
        currently_airing: storedStatusData.currently_airing || [],
        not_yet_aired: storedStatusData.not_yet_aired || [],
      });
    }
  }

  onSaveAndNext(): void {
    const formValue = this.formGroup.value;
    const anyChecked = Object.keys(formValue).some((key) => formValue[key].length > 0);
  
    if (!anyChecked) {
      const allTrueValues: { [key: string]: string[] } = {};
      Object.keys(formValue).forEach((key) => {
      allTrueValues[key] = [key];
    });
      this.quizService.setStatusFormData(allTrueValues);
    }
    else {
      this.quizService.setStatusFormData(formValue);
    }

    this.router.navigate(['quiz', 'release-date']);
  }

  onBack(): void {
    this.router.navigate(['quiz', 'genre']);
  }
}

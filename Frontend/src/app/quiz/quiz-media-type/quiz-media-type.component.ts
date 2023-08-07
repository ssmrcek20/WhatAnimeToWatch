import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { QuizService } from '../../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-media-type',
  templateUrl: './quiz-media-type.component.html',
  styleUrls: ['./quiz-media-type.component.scss']
})
export class QuizMediaTypeComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    const storedMediaTypeData = this.quizService.getMediaTypeFormData();

    this.formGroup = this.formBuilder.group({
      tv: [],
      ova: [],
      movie: [],
      special: [],
      ona: [],
      music: [],
    });
  
    this.formGroup.patchValue({
      tv: storedMediaTypeData.tv || [],
      ova: storedMediaTypeData.ova || [],
      movie: storedMediaTypeData.movie || [],
      special: storedMediaTypeData.special || [],
      ona: storedMediaTypeData.ona || [],
      music: storedMediaTypeData.music || [],
    });
  }

  onSaveAndNext(): void {
    const formValue = this.formGroup.value;
    const anyChecked = Object.keys(formValue).some((key) => formValue[key].length > 0);
  
    if (!anyChecked) {
      const allTrueValues: { [key: string]: string[] } = {};
      Object.keys(formValue).forEach((key) => {
      allTrueValues[key] = [key];
    });
      this.quizService.setMediaTypeFormData(allTrueValues);
    }
    else {
      this.quizService.setMediaTypeFormData(formValue);
    }

    this.router.navigate(['quiz', 'num-ep']);
  }
}

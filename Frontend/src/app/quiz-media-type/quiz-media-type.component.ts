import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { QuizService } from '../quiz.service';
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
    console.log(storedMediaTypeData);

    this.formGroup = this.formBuilder.group({
      tv: false,
      ova: false,
      movie: false,
      special: false,
      ona: false,
      music: false,
    });
  
    // Update the FormGroup values based on stored data
    this.formGroup.patchValue({
      tv: storedMediaTypeData.tv || false,
      ova: storedMediaTypeData.ova || false,
      movie: storedMediaTypeData.movie || false,
      special: storedMediaTypeData.special || false,
      ona: storedMediaTypeData.ona || false,
      music: storedMediaTypeData.music || false,
    });
  }

  onSaveAndNext(): void {
    const formValue = this.formGroup.value;
    const anyChecked = Object.values(formValue).some((isChecked) => isChecked);
  
    if (!anyChecked) {
      const allTrueValues = {};
      Object.keys(formValue).forEach((key) => {
        //allTrueValues[key] = true;
      });
  
      this.formGroup.patchValue(allTrueValues);
    }

    this.quizService.setMediaTypeFormData(formValue);
  
    this.router.navigate(['quiz', 'num-ep']);
  }
}

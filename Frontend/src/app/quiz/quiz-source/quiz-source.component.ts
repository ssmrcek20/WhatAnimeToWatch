import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizService } from '../../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-source',
  templateUrl: './quiz-source.component.html',
  styleUrls: ['./quiz-source.component.scss']
})
export class QuizSourceComponent implements OnInit {
  formGroup!: FormGroup;
  source: string[] = [
    '4_koma_manga',
    'book',
    'card_game',
    'game',
    'light_novel',
    'manga',
    'mixed_media',
    'music',
    'novel',
    'original',
    'other',
    'picture_book',
    'visual_novel',
    'web_manga',
    'web_novel'
  ];

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    const storedSourceData = this.quizService.getSourceFormData();

    this.formGroup = this.formBuilder.group({
      selectedSources: [],
    });

    this.formGroup.patchValue({
      selectedSources: storedSourceData.selectedSources || [],
    });
  }

  onSaveAndNext(): void {
    this.quizService.setSourceFormData(this.formGroup.value);

    this.router.navigate(['quiz', 'studio']);
  }

  onBack(): void {
    this.router.navigate(['quiz', 'release-date']);
  }
}

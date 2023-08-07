import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAgeRatingComponent } from './quiz-age-rating.component';

describe('QuizAgeRatingComponent', () => {
  let component: QuizAgeRatingComponent;
  let fixture: ComponentFixture<QuizAgeRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizAgeRatingComponent]
    });
    fixture = TestBed.createComponent(QuizAgeRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

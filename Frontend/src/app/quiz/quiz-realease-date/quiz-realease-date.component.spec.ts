import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRealeaseDateComponent } from './quiz-realease-date.component';

describe('QuizRealeaseDateComponent', () => {
  let component: QuizRealeaseDateComponent;
  let fixture: ComponentFixture<QuizRealeaseDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizRealeaseDateComponent]
    });
    fixture = TestBed.createComponent(QuizRealeaseDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

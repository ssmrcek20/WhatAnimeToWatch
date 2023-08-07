import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSourceComponent } from './quiz-source.component';

describe('QuizSourceComponent', () => {
  let component: QuizSourceComponent;
  let fixture: ComponentFixture<QuizSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizSourceComponent]
    });
    fixture = TestBed.createComponent(QuizSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

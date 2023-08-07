import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizEpDurationComponent } from './quiz-ep-duration.component';

describe('QuizEpDurationComponent', () => {
  let component: QuizEpDurationComponent;
  let fixture: ComponentFixture<QuizEpDurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizEpDurationComponent]
    });
    fixture = TestBed.createComponent(QuizEpDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizStatusComponent } from './quiz-status.component';

describe('QuizStatusComponent', () => {
  let component: QuizStatusComponent;
  let fixture: ComponentFixture<QuizStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizStatusComponent]
    });
    fixture = TestBed.createComponent(QuizStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

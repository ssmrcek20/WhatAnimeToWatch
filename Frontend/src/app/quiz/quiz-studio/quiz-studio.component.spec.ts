import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizStudioComponent } from './quiz-studio.component';

describe('QuizStudioComponent', () => {
  let component: QuizStudioComponent;
  let fixture: ComponentFixture<QuizStudioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizStudioComponent]
    });
    fixture = TestBed.createComponent(QuizStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

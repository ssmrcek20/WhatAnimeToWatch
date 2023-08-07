import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMediaTypeComponent } from './quiz-media-type.component';

describe('QuizMediaTypeComponent', () => {
  let component: QuizMediaTypeComponent;
  let fixture: ComponentFixture<QuizMediaTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizMediaTypeComponent]
    });
    fixture = TestBed.createComponent(QuizMediaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

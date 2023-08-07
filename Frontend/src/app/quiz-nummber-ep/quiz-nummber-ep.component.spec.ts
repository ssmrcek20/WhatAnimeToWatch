import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizNummberEpComponent } from './quiz-nummber-ep.component';

describe('QuizNummberEpComponent', () => {
  let component: QuizNummberEpComponent;
  let fixture: ComponentFixture<QuizNummberEpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizNummberEpComponent]
    });
    fixture = TestBed.createComponent(QuizNummberEpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

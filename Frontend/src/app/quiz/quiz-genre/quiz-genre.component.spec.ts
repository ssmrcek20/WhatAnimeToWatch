import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizGenreComponent } from './quiz-genre.component';

describe('QuizGenreComponent', () => {
  let component: QuizGenreComponent;
  let fixture: ComponentFixture<QuizGenreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizGenreComponent]
    });
    fixture = TestBed.createComponent(QuizGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

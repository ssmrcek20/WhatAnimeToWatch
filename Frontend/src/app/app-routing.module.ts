import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizMediaTypeComponent } from './quiz/quiz-media-type/quiz-media-type.component';
import { QuizNummberEpComponent } from './quiz/quiz-nummber-ep/quiz-nummber-ep.component';
import { QuizEpDurationComponent } from './quiz/quiz-ep-duration/quiz-ep-duration.component';
import { QuizGenreComponent } from './quiz/quiz-genre/quiz-genre.component';
import { QuizStatusComponent } from './quiz/quiz-status/quiz-status.component';
import { QuizRealeaseDateComponent } from './quiz/quiz-realease-date/quiz-realease-date.component';
import { QuizSourceComponent } from './quiz/quiz-source/quiz-source.component';
import { QuizStudioComponent } from './quiz/quiz-studio/quiz-studio.component';
import { QuizAgeRatingComponent } from './quiz/quiz-age-rating/quiz-age-rating.component';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'quiz', component: QuizComponent, children: [
      { path: '', redirectTo: 'media', pathMatch: 'full' },
      { path: 'media', component: QuizMediaTypeComponent },
      { path: 'num-ep', component: QuizNummberEpComponent },
      { path: 'ep-duration', component: QuizEpDurationComponent },
      { path: 'type', component: QuizGenreComponent },
      { path: 'status', component: QuizStatusComponent },
      { path: 'release-date', component: QuizRealeaseDateComponent },
      { path: 'source', component: QuizSourceComponent },
      { path: 'studio', component: QuizStudioComponent },
      { path: 'age-rating', component: QuizAgeRatingComponent },
    ]
  },
  { path: 'anime-list', component: AnimeListComponent },
  { path: 'feedback', component: ReportComponent },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

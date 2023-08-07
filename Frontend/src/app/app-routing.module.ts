import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizMediaTypeComponent } from './quiz-media-type/quiz-media-type.component';
import { QuizNummberEpComponent } from './quiz-nummber-ep/quiz-nummber-ep.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'quiz', component: QuizComponent, children: [
    { path: '', redirectTo: 'media', pathMatch: 'full' },
    { path: 'media', component: QuizMediaTypeComponent },
    { path: 'num-ep', component: QuizNummberEpComponent },
  ]},
  
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

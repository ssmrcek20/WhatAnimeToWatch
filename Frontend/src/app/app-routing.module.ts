import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'api/Animes', pathMatch: 'full', children: [] },
  { path: 'api/Animes/:id', pathMatch: 'full', children: [] },
  { path: 'api/Studios', pathMatch: 'full', children: [] },
  { path: 'api/Studios/:id', pathMatch: 'full', children: [] },
  { path: 'quiz', component: QuizComponent},
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

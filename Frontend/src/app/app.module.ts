import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StepsModule } from 'primeng/steps';
import { MenuModule } from 'primeng/menu';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';

import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SvgMainComponent } from './svg-main/svg-main.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SvgMainComponent,
    NotFoundComponent,
    QuizComponent,
    QuizMediaTypeComponent,
    QuizNummberEpComponent,
    QuizEpDurationComponent,
    QuizGenreComponent,
    QuizStatusComponent,
    QuizRealeaseDateComponent,
    QuizSourceComponent,
    QuizStudioComponent,
    QuizAgeRatingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    RippleModule,
    StepsModule,
    MenuModule,
    ReactiveFormsModule,
    CheckboxModule,
    TooltipModule,
    InputTextModule,
    InputNumberModule,
    MultiSelectModule,
    ChipsModule,
    HttpClientModule,
    ProgressSpinnerModule,
    ToastModule,
    CalendarModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

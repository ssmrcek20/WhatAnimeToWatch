import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SvgMainComponent } from './svg-main/svg-main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizMediaTypeComponent } from './quiz-media-type/quiz-media-type.component';
import { QuizNummberEpComponent } from './quiz-nummber-ep/quiz-nummber-ep.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

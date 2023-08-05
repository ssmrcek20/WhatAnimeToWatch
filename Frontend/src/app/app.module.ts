import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StepsModule } from 'primeng/steps';
import { MenuModule } from 'primeng/menu';

import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { SvgMainComponent } from './svg-main/svg-main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    SvgMainComponent,
    NotFoundComponent,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    RippleModule,
    StepsModule,
    MenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

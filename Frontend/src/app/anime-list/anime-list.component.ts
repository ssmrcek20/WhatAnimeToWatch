import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.scss']
})
export class AnimeListComponent implements OnInit {

  constructor(private quizService: QuizService, private backendService: BackendService) { }

  async ngOnInit(): Promise<void> {
      try {
        console.log(this.quizService.getAllFormData());
        const animeList = await this.backendService.getFilteredAnime(this.quizService.getAllFormData());
        console.log(animeList);
      } catch (error) {
        console.log(error);
      }
  }
  

}

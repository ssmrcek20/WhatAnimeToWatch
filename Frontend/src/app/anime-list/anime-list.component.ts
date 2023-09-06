import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { QuizService } from '../quiz.service';
import { MessageService } from 'primeng/api';
import { Anime } from '../interfaces/Anime';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.scss']
})
export class AnimeListComponent implements OnInit {
  animeList: Anime[] = [];
  isLoading = true;
  currentPage = 1;
  totalPages = 0;
  message: string = "Loading...";

  constructor(private quizService: QuizService, private backendService: BackendService, private messageService: MessageService) { }

  async ngOnInit(): Promise<void> {
      await this.loadAnime(this.currentPage);
  }

  private async loadAnime(page: number) {
    try {
      this.isLoading = true;
      const data: any = await this.backendService.getFilteredAnime(this.quizService.getAllFormData(), page);
      if(data == null){
        this.messageService.add({ severity: 'info', summary: 'Anime not found', detail: "Try different quiz answers" });
        this.message = "Anime not found :(";
      }
      else{
        this.animeList = data.animes;
        this.totalPages = data.totalPages*36;
      }

      this.isLoading = false;
      
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Anime couldn't load" });
      this.isLoading = false;
    }
  }

  async onPageChange(event: any): Promise<void> {
    this.currentPage = event.page + 1;
    window.scrollTo(0, 0);
    await this.loadAnime(this.currentPage);
  }
}

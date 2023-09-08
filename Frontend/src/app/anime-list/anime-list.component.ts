import { Component, HostListener, OnInit } from '@angular/core';
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
  pageLinkSize = 5;

  visible: boolean = false;
  header: string | undefined = "";
  image: string | undefined = "";
  synopsis: string | undefined = "";
  meanScore: number | undefined = 0;
  genres: (string | undefined)[] | undefined = [];
  startDate: string | undefined = "";
  studios: (string | undefined)[] | undefined = [];
  mediaType: string | undefined = "";
  status: string | undefined = "";
  numEpisodes: number | undefined = 0;
  rating: string | undefined = "";
  duration: number | undefined = 0;

  constructor(private quizService: QuizService, private backendService: BackendService, private messageService: MessageService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  async ngOnInit(): Promise<void> {
      await this.loadAnime(this.currentPage);
      this.checkScreenSize();
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
      this.message = "Anime couldn't load :(";
    }
  }

  async onPageChange(event: any): Promise<void> {
    this.currentPage = event.page + 1;
    window.scrollTo(0, 0);
    await this.loadAnime(this.currentPage);
  }

  checkScreenSize(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 650) {
      this.pageLinkSize = 1;
    }
    else {
      this.pageLinkSize = 5;
    }
  }

  showAnimeInfo(anime: Anime) {
    this.visible = true;
    this.header = anime.title;

    this.startDate = anime.start_date;
    this.mediaType = anime.media_type;
    this.meanScore = anime.mean;
    this.numEpisodes = anime.num_episodes;
    this.duration = anime.average_episode_duration;
    this.studios = anime.studios?.map(studio => studio.name);
    this.rating = anime.rating;
    this.image = anime.main_picture?.large;
    this.synopsis = anime.synopsis;
    this.genres = anime.genres?.map(genre => genre.name);
    this.status = anime.status;
    
  }
}

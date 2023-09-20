import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../backend.service';
import { QuizService } from '../quiz.service';
import { MessageService } from 'primeng/api';
import { Anime } from '../interfaces/Anime';
import { DatePipe } from '@angular/common';

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
  showPaginator: boolean = false;

  visible: boolean = false;
  header: string | undefined = "";
  image: string | undefined = "";
  synopsis: string | undefined = "";
  meanScore: number | undefined = 0;
  genres: (string | undefined)[] | undefined = [];
  startDate: string | null = "";
  studios: (string | undefined)[] | undefined = [];
  mediaType: string | undefined = "";
  status: string | undefined = "";
  numEpisodes: string | undefined = "";
  rating: string | undefined = "";
  duration: string | undefined = "";
  animeURL: string | undefined = "";

  @ViewChild('exitDialog') exitDialog!: ElementRef;

  constructor(private quizService: QuizService, private backendService: BackendService, private messageService: MessageService, private datePipe: DatePipe) { }

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
      console.log(this.quizService.getAllFormData());
      const data: any = await this.backendService.getFilteredAnime(this.quizService.getAllFormData(), page);
      if (data == null) {
        this.messageService.add({ severity: 'info', summary: 'Anime not found', detail: "Try different quiz answers" });
        this.message = "Anime not found :(";
      }
      else {
        this.animeList = data.animes;
        this.totalPages = data.totalPages * 36;
        this.showPaginator = true;
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

    this.startDate = this.datePipe.transform(anime.start_date, 'mediumDate');

    switch (anime.media_type) {
      case 'tv':
        this.mediaType = 'TV Show';
        break;
      case 'ova':
      case 'ona':
        this.mediaType = anime.media_type.toUpperCase();
        break;
      default:
        if (anime.media_type !== undefined) {
          this.mediaType = anime.media_type?.charAt(0).toUpperCase() + anime.media_type?.slice(1);
        }
        else {
          this.mediaType = "N/A";
        }
    }

    this.meanScore = anime.mean;

    this.numEpisodes = anime.num_episodes?.toString() + " ep";
    if (anime.average_episode_duration !== undefined) {
      this.duration = (anime.average_episode_duration / 60).toFixed(0) + " min";
    } else {
      this.duration = "N/A";
    }

    this.studios = anime.studios?.map(studio => " " + studio.name);

    switch (anime.rating) {
      case 'g':
        this.rating = "../../assets/ratings/G.svg"
        break;
      case 'pg':
        this.rating = "../../assets/ratings/PG.svg"
        break;
      case 'pg_13':
        this.rating = "../../assets/ratings/PG13.svg"
        break;
      case 'r':
        this.rating = "../../assets/ratings/R.svg"
        break;
      case 'r+':
        this.rating = "../../assets/ratings/R+.svg"
        break;
      default:
        this.status = "N/A";
    }

    this.image = anime.main_picture?.large;

    this.synopsis = anime.synopsis;

    this.genres = anime.genres?.map(genre => genre.name) || [];

    this.animeURL = "https://myanimelist.net/anime/" + anime.id;

    this.status = this.showStatus(anime);

    setTimeout(() => {
      this.exitDialog.nativeElement.focus();
    }, 1);
  }

  showStatus(anime: Anime): string {
    switch (anime.status) {
      case 'currently_airing':
        return 'Currently Airing';
      case 'not_yet_aired':
        return 'Not Yet Aired';
      default:
        return '';
    }
  }

  openMAL(): void {
    window.open(this.animeURL, "_blank");
  }
}

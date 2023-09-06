import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig, private backendService: BackendService) {}

    ngOnInit() {
        this.primengConfig.ripple = false;
        this.wakeUpServer();
    }

    wakeUpServer(): void {
      this.backendService.wakeUpServer()
      .then(response => {
        console.log('Server is awake!');
      })
      .catch(error => {
        console.error('Error waking up the server:', error.message);
      });
    }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pilotos',
  templateUrl: './pilotos.component.html',
  styleUrls: ['./pilotos.component.css'],
})
export class PilotosComponent implements OnInit {
  pilotos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://ergast.com/api/f1/current/drivers.json')
      .subscribe((response) => {
        this.pilotos = response.MRData.DriverTable.Drivers;
      });
  }

  getFlagUrl(nationality: string): string {
    const flags: { [key: string]: string } = {
      British: 'gb',
      German: 'de',
      Spanish: 'es',
      Finnish: 'fi',
      Monegasque: 'mc',
      Mexican: 'mx',
      Dutch: 'nl',
      French: 'fr',
      Canadian: 'ca',
      Australian: 'au',
      Japanese: 'jp',
      Thai: 'th',
      Chinese: 'cn',
      Brazilian: 'br',
      American: 'us',
      Danish: 'dk',
    };

    const code = flags[nationality] || 'un';
    return `https://flagcdn.com/h20/${code}.png`;
  }
}

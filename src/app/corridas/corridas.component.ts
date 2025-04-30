import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-corridas',
  templateUrl: './corridas.component.html',
  styleUrls: ['./corridas.component.css']
})
export class CorridasComponent implements OnInit {
  corridas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://ergast.com/api/f1/current.json')
      .subscribe((res) => {
        this.corridas = res.MRData.RaceTable.Races;
      });
  }

  getFlagUrl(country: string): string {
    const flags: { [key: string]: string } = {
      Australia: 'au',
      Bahrain: 'bh',
      SaudiArabia: 'sa',
      Italy: 'it',
      Japan: 'jp',
      China: 'cn',
      USA: 'us',
      Canada: 'ca',
      Spain: 'es',
      Austria: 'at',
      UnitedKingdom: 'gb',
      Hungary: 'hu',
      Belgium: 'be',
      Netherlands: 'nl',
      Singapore: 'sg',
      Mexico: 'mx',
      Brazil: 'br',
      Qatar: 'qa',
      AbuDhabi: 'ae',
      Monaco: 'mc',
      Azerbaijan: 'az'
    };

    const sanitized = country.replace(/\s/g, '');
    const code = flags[sanitized] || 'un';
    return `https://flagcdn.com/h20/${code}.png`;
  }
}

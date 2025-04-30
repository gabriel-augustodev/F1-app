import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.css']
})
export class EquipesComponent implements OnInit {
  equipes: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://ergast.com/api/f1/current/constructors.json')
      .subscribe((res) => {
        this.equipes = res.MRData.ConstructorTable.Constructors;
      });
  }

  getFlagUrl(nationality: string): string {
    const flags: { [key: string]: string } = {
      British: 'gb',
      German: 'de',
      Italian: 'it',
      French: 'fr',
      American: 'us',
      Austrian: 'at',
      Swiss: 'ch'
    };
    const code = flags[nationality] || 'un';
    return `https://flagcdn.com/h20/${code}.png`;
  }
}

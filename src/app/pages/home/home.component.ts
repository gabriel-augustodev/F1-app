import { Component, OnInit } from '@angular/core';
import { F1ApiService } from '../../services/f1-api.service';
import { nationalityToCountryCode } from '../../utils/nationality-map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  classificacao: any[] = [];
  rankingConstrutores: any[] = [];
  liderPiloto: any = null;
  proximasCorridas: any[] = [];
  currentSlide = 0;
  voltaMaisRapida: any = null;

  constructor(private f1Api: F1ApiService) {}

  ngOnInit(): void {
    // Classificação de pilotos
    this.f1Api.getClassificacaoPilotos().subscribe((res: any) => {
      this.classificacao = res.MRData.StandingsTable.StandingsLists[0].DriverStandings;

      // Após carregar a classificação, definimos o líder
      if (this.classificacao.length > 0) {
        this.liderPiloto = this.classificacao[0];
      }
    });

    // Classificação de construtores
    this.f1Api.getClassificacaoConstrutores().subscribe((res: any) => {
      this.rankingConstrutores = res.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    });

    // Próximas corridas
    this.f1Api.getCalendarioTemporada().subscribe((res: any) => {
      const todasCorridas = res.MRData.RaceTable.Races;
      const hoje = new Date();

      this.proximasCorridas = todasCorridas.filter((corrida: any) => {
        return new Date(corrida.date) > hoje;
      });

      this.f1Api.getVoltaMaisRapidaUltimaCorrida().subscribe((res: any) => {
        const resultados = res.MRData.RaceTable.Races[0].Results;
        const maisRapida = resultados.find((r: any) => r.FastestLap?.rank === "1");

        if (maisRapida) {
          this.voltaMaisRapida = {
            piloto: `${maisRapida.Driver.givenName} ${maisRapida.Driver.familyName}`,
            equipe: maisRapida.Constructor.name,
            tempo: maisRapida.FastestLap.Time.time,
            corrida: res.MRData.RaceTable.Races[0].raceName
          };
        }
      });


    });
  }

  nextSlide(): void {
    if (this.currentSlide < this.classificacao.length - 1) {
      this.currentSlide++;
    }
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  getCountryFlag(nationality: string): string {
    const countryCode = nationalityToCountryCode[nationality];
    if (countryCode) {
      return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
    } else {
      return `https://flagcdn.com/w40/un.png`;
    }
  }
}

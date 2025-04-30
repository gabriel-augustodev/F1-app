import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-piloto',
  templateUrl: './card-piloto.component.html'
})
export class CardPilotoComponent {
  @Input() piloto: any;
}

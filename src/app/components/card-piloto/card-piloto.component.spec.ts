import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPilotoComponent } from './card-piloto.component';

describe('CardPilotoComponent', () => {
  let component: CardPilotoComponent;
  let fixture: ComponentFixture<CardPilotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardPilotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPilotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

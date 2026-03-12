import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PilotosComponent } from './pilotos/pilotos.component';
import { EquipesComponent } from './equipes/equipes.component';
import { CorridasComponent } from './corridas/corridas.component';
import { HomeComponent } from './pages/home/home.component';
import { HallOfFameComponent } from './pages/hall-of-fame/hall-of-fame.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pilotos', component: PilotosComponent },
  { path: 'equipes', component: EquipesComponent },
  { path: 'corridas', component: CorridasComponent },
  { path: 'hall-of-fame', component: HallOfFameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

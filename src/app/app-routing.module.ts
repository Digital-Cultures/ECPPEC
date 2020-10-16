import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { VizComponent } from './viz/viz.component';
import { TeamComponent } from './team/team.component';
import { OutputsComponent } from './outputs/outputs.component';
import { ApiComponent } from './api/api.component';
import { DatalayertestComponent } from './datalayertest/datalayertest.component';

const routes: Routes = [
{ path: '', redirectTo: '/viz', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'viz', component: VizComponent },
  { path: 'team', component: TeamComponent },
  { path: 'api', component: ApiComponent },
  { path: 'outputs', component: OutputsComponent },
  { path: 'datalayer', component: DatalayertestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
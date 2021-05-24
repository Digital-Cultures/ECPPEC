import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
// import { VizComponent } from './viz/viz.component';
import { TeamComponent } from './team/team.component';
import { OutputsComponent } from './outputs/outputs.component';
import { ApiComponent } from './api/api.component';
import { SandpitComponent } from './sandpit/sandpit.component';
import { TableComponent } from './table/table.component';
import { ElectionsMapComponent } from './elections-map/elections-map.component';
import { ContestedStoryComponent } from './contested-story/contested-story.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { GraphQLDemoComponent } from './graph-ql-demo/graph-ql-demo.component';

const routes: Routes = [
{ path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  // { path: 'viz', component: VizComponent },
  { path: 'team', component: TeamComponent },
  { path: 'api', component: ApiComponent },
  { path: 'sandpit', component: SandpitComponent },
  { path: 'stories/contested', component: ContestedStoryComponent },
  { path: 'table', component: TableComponent },
  { path: 'outputs', component: OutputsComponent },
  { path: 'map', component:ElectionsMapComponent},
  { path: 'heatmap', component:HeatmapComponent},
  { path: 'graphQL-demo', component:GraphQLDemoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
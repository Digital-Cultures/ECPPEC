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

import { EssaysComponent } from './essays/essays.component';
import { DataComponent } from './data/data.component';
import { CreditsComponent } from './credits/credits.component';

import { GraphQLDemoComponent } from './graph-ql-demo/graph-ql-demo.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NewcastleStoryComponent } from './newcastle-story/newcastle-story.component';
import { StoriesComponent } from './stories/stories.component';

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  
  { path: 'about', component: AboutComponent },
  // { path: 'viz', component: VizComponent },
  { path: 'team', component: TeamComponent },
  { path: 'api', component: ApiComponent },
  // { path: 'sandpit', component:  SandpitComponent},
  { path: 'gallery', component: GalleryComponent  },
  { path: 'contested', component: ContestedStoryComponent },
  { path: 'stories', component: StoriesComponent },

  { path: 'newcastle', component: NewcastleStoryComponent },
  { path: 'data', component: DataComponent },
  { path: 'table', component: TableComponent },
  { path: 'outputs', component: OutputsComponent },
  { path: 'map', component: ElectionsMapComponent },
  { path: 'credits', component: CreditsComponent },
  { path: 'heatmap', component: HeatmapComponent },
  { path: 'essays', component: EssaysComponent },
  { path: 'graphQL-demo', component: GraphQLDemoComponent },
  { path: '**', component: AboutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
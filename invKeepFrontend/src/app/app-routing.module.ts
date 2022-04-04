import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {AssetCreateComponent} from "./components/asset-create/asset-create.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {AssetAnalysisComponent} from "./components/asset-analysis/asset-analysis.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'create', component: AssetCreateComponent},
  {path: 'edit/:assetId', component: AssetCreateComponent},
  {path: 'analysis/:assetId', component: AssetAnalysisComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

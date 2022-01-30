import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {AssetCreateComponent} from "./components/asset-create/asset-create.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {AssetDetailsComponent} from "./components/asset-details/asset-details.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'create', component: AssetCreateComponent},
  {path: 'edit/:assetId', component: AssetCreateComponent},
  {path: 'details/:assetId', component: AssetDetailsComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

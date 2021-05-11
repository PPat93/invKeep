import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {AssetCreateComponent} from "./assetComponents/asset-create/asset-create.component";
import {HomePageComponent} from "./home-page/home-page.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'create', component: AssetCreateComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

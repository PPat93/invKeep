import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {AssetListComponent} from "./assetComponents/asset-list/asset-list.component";
import {AssetCreateComponent} from "./assetComponents/asset-create/asset-create.component";

const routes: Routes = [
  {path: '', component: AssetListComponent},
  {path: 'create', component: AssetCreateComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

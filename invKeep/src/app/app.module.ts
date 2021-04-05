import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AssetCreateComponent } from './assetsList/asset-create/asset-create.component';
import {FormsModule} from "@angular/forms";
import { AssetItemComponent } from './assetsList/asset-item/asset-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AssetCreateComponent,
    AssetItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

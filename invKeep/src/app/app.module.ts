import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from '@angular/material/toolbar';

import {AppComponent} from './app.component';
import {AssetCreateComponent} from './assetComponents/asset-create/asset-create.component';
import {AssetListComponent} from './assetComponents/asset-list/asset-list.component';
import {AssetListItemComponent} from './assetComponents/asset-list/asset-list-item/asset-list-item.component';
import {ToolbarMenuComponent} from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AssetCreateComponent,
    ToolbarMenuComponent,
    AssetListComponent,
    AssetListItemComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}

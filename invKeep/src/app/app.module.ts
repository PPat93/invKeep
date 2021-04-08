import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from "@angular/material/icon";

import { AppComponent } from './app.component';
import { AssetCreateComponent } from './assetComponents/asset-create/asset-create.component';
import { ToolbarMenuComponent} from './toolbar/toolbar.component';
import { AssetListComponent } from './assetComponents/asset-list/asset-list.component'
import { AssetListItemComponent } from './assetComponents/asset-list-item/asset-list-item.component'

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
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

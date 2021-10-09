import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http'
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgModule} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {AppComponent} from './app.component';
import {AssetCreateComponent} from './assetComponents/asset-create/asset-create.component';
import {AssetDetailsComponent} from './assetComponents/asset-details/asset-details.component';
import {AssetListComponent} from './assetComponents/asset-list/asset-list.component';
import {MenuComponent} from './menu/menu.component';
import {MessageDisplayComponent} from './message-display/message-display.component';
import {ToolbarMenuComponent} from './toolbar/toolbar.component';
import {HomePageComponent} from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AssetCreateComponent,
    AssetDetailsComponent,
    AssetListComponent,
    MenuComponent,
    MessageDisplayComponent,
    ToolbarMenuComponent,
    HomePageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}

import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http'
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

import { AppComponent } from './app.component';
import { AssetCreateComponent } from './components/asset-create/asset-create.component';
import { AssetAnalysisComponent } from './components/asset-analysis/asset-analysis.component';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { LoadingSpinnerComponent } from './utils/spinner/loading-spinner.component';
import { MenuComponent } from './components/menu/menu.component';
import { MessageDisplayComponent } from './components/message-display/message-display.component';
import { ToolbarMenuComponent } from './components/toolbar/toolbar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RatioDetailsDialogComponent } from "./components/ratio-details-dialog/ratio-details-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    AssetCreateComponent,
    AssetAnalysisComponent,
    AssetListComponent,
    HomePageComponent,
    LoadingSpinnerComponent,
    MenuComponent,
    MessageDisplayComponent,
    RatioDetailsDialogComponent,
    ToolbarMenuComponent
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
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}

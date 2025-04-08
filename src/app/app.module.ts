import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { MultiSelectComponent } from './common/shared-component/multi-select/multi-select.component';
import { setHiddenExtendComponent } from './common/shared-component/set-hidden-extend/set-hidden-extend.component';
import { WidthWidgetComponent } from './common/shared-component/width-widget/width-widget.component';
import { DoughnutPluginService } from './service/doughnut-plugin/doughnut-plugin.service';
import { LegendService } from './service/legend-alignment-plugin/legend-alignment-plugin.service';
import { ChartScrollService } from './service/chart-bar-scroll/chart-bar-scroll.service';
import { VehicleDataService } from './service/vehicle-data/vehicle-data.service';
import { DashboardDoughnutComponent } from './common/chart-items/dashboard-doughnut/dashboard-doughnut.component';
import { BarChartComponent } from './common/chart-items/bar-chart/bar-chart.component';
import { VehicleWidgetComponent } from './common/chart-items/vehicle-widget/vehicle-widget.component';
import { DynamicLoadWidgetComponent } from './common/chart-items/dynamic-load-widget/dynamic-load-widget.component';
import { VehicleListComponent } from './common/shared-component/vehicle-list/vehicle-list.component';
import { DashBoardComponent } from './lab-component/dash-board/dash-board.component';
import { WidgetUpdateDataService } from './service/vehicle-data/widget-update-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { WidgetItemComponent } from './common/widget-item/widget-item.component';
import { LoginComponent } from './lab-component/login/login.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    MultiSelectComponent,
    WidthWidgetComponent,
    setHiddenExtendComponent,
    VehicleWidgetComponent,
    DashboardDoughnutComponent,
    BarChartComponent,
    VehicleListComponent,
    DynamicLoadWidgetComponent,
    DashBoardComponent,
    WidgetItemComponent,
    LoginComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
    }),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    DoughnutPluginService,
    LegendService,
    ChartScrollService,
    VehicleDataService,
    WidgetUpdateDataService,
    TranslateService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

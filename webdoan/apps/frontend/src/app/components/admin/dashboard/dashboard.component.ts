import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCollectionResponse, ApiItemResponse } from '@frontend/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardService } from './dashboard.service';
import * as moment from 'moment';
import { distinctUntilChanged } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public report!: {
    userCount: number;
    courseCount: number;
    questionCount: number;
  };
  public reportUser: Array<{ label: Date; value: number }> = [];
  public date!: string;
  public barChartType: ChartType = 'bar';
  public barChartLabels: string[] = [];
  public barChartData!: ChartData<'bar'>;
  public barChartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };
  lists = [1, 2, 3, 4];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService
  ) {
    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe(({ type, from }) => {
        const now = moment();
        this.date = now.format('YYYY-MM-DD');
        this.getReportUser(type ?? 'week', from ?? this.date);
      });
    this.getReport();
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {}

  private getReport() {
    this.dashboardService.getReport().subscribe(
      (
        result: ApiItemResponse<{
          userCount: number;
          courseCount: number;
          questionCount: number;
        }>
      ) => {
        this.report = result.data;
      }
    );
  }

  private getReportUser(type: string, from: string) {
    this.dashboardService
      .getUserReport({ type, from })
      .subscribe(
        (result: ApiCollectionResponse<{ label: Date; value: number }>) => {
          this.reportUser = result.data;
          this.barChartLabels = this.reportUser.map((item) =>
            item.label.toString()
          );
          const barValueChart = this.reportUser.map((item) => item.value);
          this.barChartData = {
            labels: this.barChartLabels,
            datasets: [
              {
                data: barValueChart,
                label: 'Số học viên mới',
              },
            ],
          };
        }
      );
  }

  change(type: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        type: type ?? 'week',
        from: this.date,
      },
      queryParamsHandling: 'merge',
    });
  }
}

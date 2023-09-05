import { Component, effect } from '@angular/core';
import { TableService } from '../_shared/services/table.service';

@Component({
  selector: 'app-table-settings',
  templateUrl: './table-settings.component.html',
  styleUrls: ['./table-settings.component.scss'],
})
export class TableSettingsComponent {
  inputFunction: string = '';
  inputStart: number = 0;
  inputEnd: number = 0;
  inputStep: number = 1;
  inputDecimals: number = 2;

  constructor(private tableService: TableService) {
    effect(() => {
      this.inputFunction = this.tableService.Function();
      this.inputStart = this.tableService.Start();
      this.inputEnd = this.tableService.End();
      this.inputStep = this.tableService.Step();
      this.inputDecimals = this.tableService.Decimals();
    });
  }

  onSubmit() {
    this.tableService.Function.set(this.inputFunction);
    this.tableService.Start.set(this.inputStart);
    this.tableService.End.set(this.inputEnd);
    this.tableService.Step.set(this.inputStep);
    this.tableService.Decimals.set(this.inputDecimals);
    this.tableService.createTableData(
      this.inputFunction,
      this.inputStart,
      this.inputEnd,
      this.inputStep,
      this.inputDecimals
    );
  }
}

import { Component, effect } from '@angular/core';
import { TableService } from '../_shared/services/table.service';

@Component({
  selector: 'app-value-table',
  templateUrl: './value-table.component.html',
  styleUrls: ['./value-table.component.scss'],
})
export class ValueTableComponent {
  function = '';
  originalTableData = [];
  tableData = [];
  variableName = 'x';
  inputFilterFunction = '';
  filterFunctionValid = true;

  showInfo = false;

  constructor(private tableService: TableService) {
    effect(() => {
      this.function = this.tableService.Function();
      this.checkVariableName(this.function);
      this.originalTableData = this.tableService.tableData();
      this.tableData = [...this.originalTableData];
    });
  }

  ngOnInit(): void {
    this.originalTableData = this.tableService.tableData();
    this.tableData = [...this.originalTableData];
  }

  isInputValid(condition: string): boolean {
    const pattern =
      /^(?:(f|[0-9]*\.?[0-9]+)([+\-*/^%]|<=?|>=?|==){1})?(f|[0-9]*\.?[0-9]+)(?:([+\-*/^%]|<=?|>=?|==)(f|[0-9]*\.?[0-9]+))*$/;

    const conditions = condition.split('&');

    for (let cond of conditions) {
      cond = cond.trim();
      if (!pattern.test(cond)) return false;
    }

    const openParentheses = (condition.match(/\(/g) || []).length;
    const closeParentheses = (condition.match(/\)/g) || []).length;

    // Ensuring the number of opening and closing parentheses are the same
    return openParentheses === closeParentheses;
  }

  checkVariableName(func: string): void {
    const firstLetter = func.match(/[a-z]/i);
    if (firstLetter) {
      this.variableName = firstLetter[0];
    }
  }

  filterData(): void {
    if (!this.isInputValid(this.inputFilterFunction)) {
      this.tableData = this.originalTableData;
      if (this.inputFilterFunction.trim().length !== 0)
        this.filterFunctionValid = false;
      return;
    }
    this.filterFunctionValid = true;

    const conditions = this.inputFilterFunction.split('&');

    this.tableData = this.originalTableData.filter((row) => {
      const value: any = row[1]; // Assuming the second value in each row is f(x)

      for (let condition of conditions) {
        condition = condition.trim().replace(/f/g, value.toString());
        try {
          if (!new Function(`return ${condition}`)()) {
            return false; // If one condition is false, we exit early
          }
        } catch (err) {
          console.error('Error evaluating condition:', condition);
          return false;
        }
      }
      return true; // If all conditions pass, we return true
    });
  }
}

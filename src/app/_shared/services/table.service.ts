import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  public Function = signal('');
  public Start = signal(0);
  public End = signal(0);
  public Step = signal(1);
  public Decimals = signal(2);

  public tableData = signal(<any>[]);

  constructor() {
    this.loadFromLocalStorage();

    effect(() => {
      this.saveToLocalStorage();
    });

    effect(() => {});

    console.log(this.tableData());
  }

  addRow(key: number, value: number) {
    this.tableData.update((tableData) => {
      tableData.push([key, value]);
      return tableData;
    });
  }

  removeRow(index: number) {
    this.tableData.update((tableData) => {
      tableData.splice(index, 1);
      return tableData;
    });
  }

  createTableData(
    func: string,
    start: number,
    end: number,
    step: number,
    decimals: number
  ) {
    console.log('createTabledata');

    // Clear the tableData first to prevent accumulation of old rows
    this.tableData.set([]);

    //if no * before letter, add it
    if (!func.match(/\*/)) {
      func = func.replace(/([a-z])/i, '*$1');
    }
    for (let i = start; i <= end; i += step) {
      const value = eval(func.replace(/([a-z])/i, i.toString()));
      this.addRow(i, +value.toFixed(decimals));
    }
  }

  saveToLocalStorage() {
    console.log('saveToLocalStorage');
    const valueTableSave = {
      function: this.Function(),
      start: this.Start(),
      end: this.End(),
      step: this.Step(),
      decimals: this.Decimals(),
    };
    localStorage.setItem('valueTableSave', JSON.stringify(valueTableSave));
  }

  loadFromLocalStorage() {
    console.log('loadFromLocalStorage');
    const valueTableSave = JSON.parse(
      localStorage.getItem('valueTableSave') || '{}'
    );
    this.Function.set(valueTableSave.function || '');
    this.Start.set(valueTableSave.start || 0);
    this.End.set(valueTableSave.end || 0);
    this.Step.set(valueTableSave.step || 1);
    this.Decimals.set(valueTableSave.decimals || 2);
  }
}

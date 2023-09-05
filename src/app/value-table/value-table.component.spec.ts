import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueTableComponent } from './value-table.component';

describe('ValueTableComponent', () => {
  let component: ValueTableComponent;
  let fixture: ComponentFixture<ValueTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValueTableComponent]
    });
    fixture = TestBed.createComponent(ValueTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

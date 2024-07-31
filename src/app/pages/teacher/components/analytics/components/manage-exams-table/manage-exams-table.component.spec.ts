import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExamsTableComponent } from './manage-exams-table.component';

describe('ManageExamsTableComponent', () => {
  let component: ManageExamsTableComponent;
  let fixture: ComponentFixture<ManageExamsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageExamsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageExamsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

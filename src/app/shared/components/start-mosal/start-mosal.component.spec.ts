import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartMosalComponent } from './start-mosal.component';

describe('StartMosalComponent', () => {
  let component: StartMosalComponent;
  let fixture: ComponentFixture<StartMosalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartMosalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartMosalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTestResultComponent } from './recent-test-result.component';

describe('RecentTestResultComponent', () => {
  let component: RecentTestResultComponent;
  let fixture: ComponentFixture<RecentTestResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentTestResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

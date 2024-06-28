import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutCardPlaceholderComponent } from './shortcut-card-placeholder.component';

describe('ShortcutCardPlaceholderComponent', () => {
  let component: ShortcutCardPlaceholderComponent;
  let fixture: ComponentFixture<ShortcutCardPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortcutCardPlaceholderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShortcutCardPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

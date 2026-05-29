import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SareeCardComponent } from './saree-card.component';

describe('SareeCardComponent', () => {
  let component: SareeCardComponent;
  let fixture: ComponentFixture<SareeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SareeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SareeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

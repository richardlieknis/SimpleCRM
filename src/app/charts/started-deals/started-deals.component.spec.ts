import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartedDealsComponent } from './started-deals.component';

describe('StartedDealsComponent', () => {
  let component: StartedDealsComponent;
  let fixture: ComponentFixture<StartedDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartedDealsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartedDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

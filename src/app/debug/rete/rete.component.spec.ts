import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReteComponent } from './rete.component';

describe('ReteComponent', () => {
  let component: ReteComponent;
  let fixture: ComponentFixture<ReteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

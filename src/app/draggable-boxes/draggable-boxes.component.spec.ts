import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableBoxesComponent } from './draggable-boxes.component';

describe('DraggableBoxesComponent', () => {
  let component: DraggableBoxesComponent;
  let fixture: ComponentFixture<DraggableBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggableBoxesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DraggableBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

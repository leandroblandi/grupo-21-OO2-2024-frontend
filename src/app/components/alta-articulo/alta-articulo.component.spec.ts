import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaArticuloComponent } from './alta-articulo.component';

describe('AltaArticuloComponent', () => {
  let component: AltaArticuloComponent;
  let fixture: ComponentFixture<AltaArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaArticuloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AltaArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

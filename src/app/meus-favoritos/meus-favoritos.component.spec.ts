import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusFavoritosComponent } from './meus-favoritos.component';

describe('MeusFavoritosComponent', () => {
  let component: MeusFavoritosComponent;
  let fixture: ComponentFixture<MeusFavoritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusFavoritosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeusFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

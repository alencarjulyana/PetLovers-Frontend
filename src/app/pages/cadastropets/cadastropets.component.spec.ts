import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastropetsComponent } from './cadastropets.component';

describe('CadastropetsComponent', () => {
  let component: CadastropetsComponent;
  let fixture: ComponentFixture<CadastropetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastropetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastropetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

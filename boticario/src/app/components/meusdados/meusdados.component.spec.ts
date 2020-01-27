import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusdadosComponent } from './meusdados.component';

describe('MeusdadosComponent', () => {
  let component: MeusdadosComponent;
  let fixture: ComponentFixture<MeusdadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusdadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusdadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

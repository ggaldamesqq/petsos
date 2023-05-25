import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaValidacionPage } from './pagina-validacion.page';

describe('PaginaValidacionPage', () => {
  let component: PaginaValidacionPage;
  let fixture: ComponentFixture<PaginaValidacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaginaValidacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

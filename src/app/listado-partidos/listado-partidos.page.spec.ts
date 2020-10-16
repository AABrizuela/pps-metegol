import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListadoPartidosPage } from './listado-partidos.page';

describe('ListadoPartidosPage', () => {
  let component: ListadoPartidosPage;
  let fixture: ComponentFixture<ListadoPartidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoPartidosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoPartidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

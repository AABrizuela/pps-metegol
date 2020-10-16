import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopJugadoresPage } from './top-jugadores.page';

describe('TopJugadoresPage', () => {
  let component: TopJugadoresPage;
  let fixture: ComponentFixture<TopJugadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopJugadoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopJugadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

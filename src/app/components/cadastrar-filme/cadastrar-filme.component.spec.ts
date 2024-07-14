import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarFilmeComponent } from './cadastrar-filme.component';
import { FooterComponent } from '../footer/footer.component';
import { AppModule } from 'src/app/app.module';

describe('CadastrarFilmeComponent', () => {
  let component: CadastrarFilmeComponent;
  let fixture: ComponentFixture<CadastrarFilmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [CadastrarFilmeComponent, FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

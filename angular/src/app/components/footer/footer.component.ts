import { Component, Output, EventEmitter } from '@angular/core';
import { Pagina } from '../../models/noticia.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Output() cambioPagina = new EventEmitter<Pagina>();

  navegar(pagina: Pagina): void {
    this.cambioPagina.emit(pagina);
  }
}

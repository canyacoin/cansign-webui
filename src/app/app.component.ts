import { Component } from '@angular/core';
import { SharedService } from '@service/shared.service';
import { LanguageService, Language } from '@canyaio/common-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  constructor(public shared: SharedService) {}
}

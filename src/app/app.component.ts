import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService, Language } from '@canyaio/common-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  constructor(
    translate: TranslateService,
    lang: LanguageService) {
    translate.setDefaultLang('en')
    translate.use('es')

    lang.onLanguageChange.subscribe(language => {
      console.log(language)
    })
  }
}

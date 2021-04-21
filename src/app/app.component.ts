import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'apnaBazar';
  constructor(public translate:TranslateService){
    this.translate.addLangs(['en','my']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}

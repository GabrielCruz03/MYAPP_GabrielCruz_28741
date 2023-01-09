import { Component } from '@angular/core';
import { ToastController } from "@ionic/angular";
import { TranslateService } from '@ngx-translate/core';
import { Preferences } from '@capacitor/preferences';
import { LocalizationService } from '../services/localization/localization.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  darkMode = false;
  isChecked : boolean = false;

  constructor(
    private translateService: TranslateService,
    private toastController: ToastController,
    private LocalizationService:LocalizationService
  ) {}
  
  
  //MULTI IDIOMA
  async changeLanguage(language : string) {
    await Preferences.set({ key: 'user-lang', value: language });
    await this.showToast();
    await this.LocalizationService.setLanguage(language);
    }
  async showToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant("Idioma alterado com sucesso!"),
      duration: 4000,
    });
    await toast.present();
  }

  //DARKMODE
  async  ionViewWillEnter() {
    this.isChecked = (await Preferences.get({ key: 'darkmode' })).value === 'false';
  }

  toggleDarkMode() {
    if (this.darkMode) {
      document.body.classList.remove('dark-mode');
      Preferences.set({ key: 'darkmode', value: this.isChecked ? 'true' : 'false' });
      console.log("DarkMode desativado!")
    } else {
      document.body.classList.add('dark-mode');
      Preferences.set({ key: 'darkmode', value: this.isChecked ? 'false' : 'true' });
      console.log("DarkMode ativado!")
    }
    this.darkMode = !this.darkMode;
  }
  
}
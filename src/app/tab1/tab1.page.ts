import { Component } from '@angular/core';
import { ToastController } from "@ionic/angular";
import { TranslateService } from '@ngx-translate/core';
import { Preferences } from '@capacitor/preferences';
import { LocalizationService } from '../services/localization/localization.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isModalOpen_habilidades = false;
  isModalOpen_idiomas = false;
  isModalOpen_educacao = false;
  isModalOpen_projetos = false;

  darkMode = false;
  isChecked: boolean = false;

  constructor(
    private translateService: TranslateService,
    private toastController: ToastController,
    private LocalizationService:LocalizationService
  ) { }

  setOpen_habilidades(isOpen: boolean) {
    this.isModalOpen_habilidades = isOpen;
  }
  setOpen_idiomas(isOpen: boolean) {
    this.isModalOpen_idiomas = isOpen;
  }
  setOpen_educacao(isOpen: boolean) {
    this.isModalOpen_educacao = isOpen;
  }
  setOpen_projetos(isOpen: boolean) {
    this.isModalOpen_projetos = isOpen;
  }


  //MULTI IDIOMA
  async changeLanguage(language: string) {
    await Preferences.set({ key: 'user-lang', value: language });
    await this.showToast();
    await this.LocalizationService.setLanguage(language);
  }
  async showToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant("{{ 'Idioma alterado com sucesso!' | translate }}"),
      duration: 4000,
    });
    await toast.present();
  }

  //DARKMODE
  async ionViewWillEnter() {
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
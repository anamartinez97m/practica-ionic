import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { DomController } from "@ionic/angular";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn: 'root'
  })
  export class ThemeService {
  
    public renderer: Renderer2;
    public currentTheme;
  
    constructor(
        private rendererFactory: RendererFactory2, 
        private domCtrl: DomController,
        private storage: StorageService
    ) {
      this.renderer = this.rendererFactory.createRenderer(null, null);
    }
    
    changeTheme(toColor: string) {
      this.domCtrl.write(() => {
        if(toColor === 'default') {
          document.documentElement.setAttribute(
            "style", "header-background:--header-background-default;"
          );
        } else {
          document.documentElement.style.setProperty('--header-background-dark', toColor);
        }
      });
    }

    async enableNightMode(isNightModeEnabled) {
      if (isNightModeEnabled) {
        this.changeTheme('default');
      } else {
        this.changeTheme('#3858a1');
      }
      isNightModeEnabled = !isNightModeEnabled;
      await this.storage.set('nightMode', isNightModeEnabled);
      return isNightModeEnabled;
    }

    enableNightModeFromStorage(isNightModeEnabled) {
      if (!isNightModeEnabled) {
        this.changeTheme('default');
      } else {
        this.changeTheme('#3858a1');
      }
    }
  }
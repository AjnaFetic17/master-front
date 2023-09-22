import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'UNet';

  private readonly customIcons = ['logo', 'camera'];

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {}

  ngOnInit(): void {
    for (const icon of this.customIcons) {
      const iconUrl = `/assets/img/icons/${icon}.svg`;
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(iconUrl)
      );
      const img = new Image();
      img.src = iconUrl;
    }
  }
}

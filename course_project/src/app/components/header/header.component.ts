import { Component } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private storageService: DataStorageService) {}
  collapsed = true;
  
  onSaveData() {
    this.storageService.saveRecipes();
  }

  onLoadRecipes() {
    this.storageService.loadRecipes()
  }
}

import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  authService: AuthService;
  persistenceMode = '';

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit(): void {
  }

  setPersistence(mode: string): void{
    this.authService.setPersistence(mode);
    this.persistenceMode = mode;
  }
}

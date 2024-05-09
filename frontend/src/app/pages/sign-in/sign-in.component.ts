import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  authService: AuthService;
  signInForm: FormGroup;
  formBuilder: FormBuilder;
  errorCode: string;
  router: Router;

  constructor(authService: AuthService, formBuilder: FormBuilder, router: Router) {
    this.authService = authService;
    this.formBuilder = formBuilder;
    this.router = router;
    this.errorCode = '';
  }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signIn(): void{
    this.authService.signIn(this.signInForm.controls.email.value, this.signInForm.controls.password.value).then(
      (userCredentials) => {
        this.router.navigate(['/trips-listing']);
      },
      (error) => {
        this.errorCode = error.code;
        this.signInForm.reset();
      });
  }
}

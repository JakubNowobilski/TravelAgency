import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  authService: AuthService;
  usersService: UsersService;
  signUpForm: FormGroup;
  formBuilder: FormBuilder;
  errorCode: string;
  router: Router;

  constructor(authService: AuthService, usersService: UsersService, formBuilder: FormBuilder, router: Router) {
    this.authService = authService;
    this.usersService = usersService;
    this.formBuilder = formBuilder;
    this.router = router;
    this.errorCode = '';
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signUp(): void{
    this.authService.signUp(this.signUpForm.controls.email.value, this.signUpForm.controls.password.value).then(
      (userCredentials) => {
        this.router.navigate(['/trips-listing']);
        const newUser = new User('', this.signUpForm.controls.email.value, 'reader', []);
        this.usersService.addUser(newUser);
      },
      (error) => {
        this.errorCode = error.code;
        this.signUpForm.reset();
      });
  }
}

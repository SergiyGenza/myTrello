import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/authservice.service';

const urls = ['sign-up', 'log-in'];

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  type!: string;
  url!: string;
  description!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getRoute();
    this.getRouteData()
  }

  form = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })

  private getRoute(): void {
    this.router.events.subscribe(() => {
      this.type = this.router.url;
    });
  }

  private getRouteData(): void {
    this.route.data.subscribe((data) => {
      this.url = data['url'],
        this.description = data['description'];
    });
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    this.url == 'singup'
      ? this.authService.signUp(email, password)
      : this.authService.logIn(email, password);
  }
}

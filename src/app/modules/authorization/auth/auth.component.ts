import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'src/app/common/decorators/autounsubscribe.decorator';
import { AuthService } from 'src/app/common/services/authservice.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
@AutoUnsubscribe()
export class AuthComponent implements OnInit {
  public title!: string;
  public url!: string;
  public description!: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getRouteData()
  }

  public form = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })

  private getRouteData(): void {
    this.route.data.subscribe((data) => {
      this.url = data['url'],
        this.description = data['description'],
        this.title = data['title'];
    });
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    this.url == 'singup'
      ? this.authService.signUp(email, password)
      : this.authService.logIn(email, password);
  }
}

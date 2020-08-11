import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from '../store/index';
import * as fromUser from '../store/user';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  loading$: Observable<boolean>;
  success$: Observable<boolean>;
  error$: Observable<boolean>;
  destroy$: Subject<void> = new Subject();

  submitted = false;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.IAppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // redirect to home if already logged in
    this.store.select(fromUser.getUserInfo)
    .pipe(takeUntil(this.destroy$))
    .subscribe(next => {
      if (next) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(fromUser.getLoadingLogin).pipe(takeUntil(this.destroy$));
    this.success$ = this.store.select(fromUser.getSuccessLogin).pipe(takeUntil(this.destroy$));
    this.error$ = this.store.select(fromUser.getFailLogin).pipe(takeUntil(this.destroy$));
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get form(): { [key: string]: AbstractControl; } { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(new fromUser.Login({
      email: this.form.email.value,
      password: this.form.password.value,
      returnUrl: this.returnUrl }));
  }
}

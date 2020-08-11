import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from '../store/index';
import * as fromUser from '../store/user';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {delay, filter, takeUntil} from 'rxjs/operators';

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
  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.IAppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading$ = this.store.select(fromUser.getLoadingLogin).pipe(takeUntil(this.destroy$));
    this.success$ = this.store.select(fromUser.getSuccessLogin).pipe(takeUntil(this.destroy$));
    this.error$ = this.store.select(fromUser.getFailLogin).pipe(takeUntil(this.destroy$));
    this.initForm();
    this.onLoginSuccess();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  submit(): void {
    const { email, password } = this.loginForm.value;
    this.store.dispatch(new fromUser.Login({ email, password }));
  }

  onLoginSuccess(): void {
    this.success$.pipe(
      filter(success => success),
      // đợi 3s sau khi login thành công,chuyển tới home page
      delay(3000),
    ).subscribe(() => {
      this.router.navigate(['home']);
    });
  }

}

import {Component, OnDestroy} from '@angular/core';
import {User} from './models/user';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromRoot from './store';
import * as fromUser from './store/user';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'angular-ngrx-store-demo';
  currentUser$: Observable<User>;
  destroy$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private store: Store<fromRoot.IAppState>
  ) {
    this.currentUser$ = this.store.select(fromUser.getUserInfo).pipe(takeUntil(this.destroy$));
  }

  logout(): void {
    this.store.dispatch(new fromUser.Logout());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

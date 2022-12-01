import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { Observable } from 'rxjs';

import * as ShellActions from './shell.actions';
import { ShellEffects } from './shell.effects';
import { hot } from 'jasmine-marbles';

describe('ShellEffects', () => {
  let actions: Observable<Action>;
  let effects: ShellEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ShellEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ShellEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ShellActions.init() });

      const expected = hot('-a-|', {
        a: ShellActions.loadShellSuccess({ shell: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});

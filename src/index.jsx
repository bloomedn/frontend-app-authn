import 'babel-polyfill';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize, mergeConfig,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router-dom';

import { messages as headerMessages } from '@edx/frontend-component-header';

import configureStore from './data/configureStore';
import { LoginPage, RegistrationPage } from './logistration';
import {
  LOGIN_PAGE, PAGE_NOT_FOUND, REGISTER_PAGE, RESET_PAGE, PASSWORD_RESET_CONFIRM,
} from './data/constants';
import ForgotPasswordPage from './forgot-password';
import {
  HeaderLayout, UnAuthOnlyRoute, registerIcons, NotFoundPage,
} from './common-components';
import ResetPasswordPage from './reset-password';
import appMessages from './i18n';

import './index.scss';

registerIcons();

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={configureStore()}>
      <HeaderLayout>
        <Switch>
          <Route exact path="/">
            <Redirect to={PAGE_NOT_FOUND} />
          </Route>
          <UnAuthOnlyRoute exact path={LOGIN_PAGE} component={LoginPage} />
          <UnAuthOnlyRoute exact path={REGISTER_PAGE} component={RegistrationPage} />
          <UnAuthOnlyRoute exact path={RESET_PAGE} component={ForgotPasswordPage} />
          <Route exact path={PASSWORD_RESET_CONFIRM} component={ResetPasswordPage} />
          <Route path={PAGE_NOT_FOUND} component={NotFoundPage} />
          <Route path="*">
            <Redirect to={PAGE_NOT_FOUND} />
          </Route>
        </Switch>
      </HeaderLayout>
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  handlers: {
    config: () => {
      mergeConfig({
        LOGIN_ISSUE_SUPPORT_LINK: process.env.LOGIN_ISSUE_SUPPORT_LINK || null,
        ACTIVATION_EMAIL_SUPPORT_LINK: process.env.ACTIVATION_EMAIL_SUPPORT_LINK || null,
        PASSWORD_RESET_SUPPORT_LINK: process.env.PASSWORD_RESET_SUPPORT_LINK || null,
      });
    },
  },
  messages: [
    appMessages,
    headerMessages,
  ],
});

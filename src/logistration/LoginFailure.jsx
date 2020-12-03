import React from 'react';

import { FormattedMessage, injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Alert, Hyperlink } from '@edx/paragon';
import PropTypes from 'prop-types';

import { NON_COMPLIANT_PASSWORD_EXCEPTION } from './data/constants';
import messages from './messages';

const processLink = (link) => {
  let matches;
  link.replace(/(.*)<a href=["']([^"']*).*>([^<]+)<\/a>(.*)/g, function () { // eslint-disable-line func-names
    matches = Array.prototype.slice.call(arguments, 1, 5); // eslint-disable-line  prefer-rest-params
  });
  return matches;
};

const LoginFailureMessage = (props) => {
  const errorMessage = props.errors;
  const { errorCode, intl } = props;

  const Link = (args) => (
    <>
      {args.beforeLink}
      <Hyperlink destination={args.link}>
        {args.linkText}
      </Hyperlink>
      {args.afterLink}
    </>
  );

  let errorList;

  switch (errorCode) {
    case NON_COMPLIANT_PASSWORD_EXCEPTION:
      errorList = (
        <li key="password-non-compliance">
          <FormattedMessage
            id="login.non.compliant.password.error"
            defaultMessage="{passwordComplaintRequirements} {lineBreak}Your current password does not meet the new security
            requirements. We just sent a password-reset message to the email address associated with this account.
            Thank you for helping us keep your data safe."
            values={{
              passwordComplaintRequirements: <strong>{intl.formatMessage(messages['logistration.non.compliant.password.title'])}</strong>,
              lineBreak: <br />,
            }}
          />
        </li>
      );
      break;
    default:
      // TODO: use errorCode instead of processing errorMessages on frontend
      errorList = errorMessage.trim().split('\n');
      errorList = errorList.map((error) => {
        let matches;
        if (error.includes('a href')) {
          matches = processLink(error);
          const [beforeLink, link, linkText, afterLink] = matches;
          return (
            <li key={error}>
              <Link // eslint-disable-line  jsx-a11y/anchor-is-valid
                beforeLink={beforeLink}
                link={link}
                linkText={linkText}
                afterLink={afterLink}
              />
            </li>
          );
        }
        return <li key={error}>{error}</li>;
      });
  }

  return (
    <Alert variant="danger">
      <div>
        <h4 style={{ color: '#a0050e' }}>
          <FormattedMessage
            id="logistration.login.failure.header.title"
            defaultMessage="We couldn't sign you in."
            description="login failure header message."
          />
        </h4>
        <ul>{errorList}</ul>
      </div>
    </Alert>
  );
};

LoginFailureMessage.defaultProps = {
  errors: '',
  errorCode: null,
};
LoginFailureMessage.propTypes = {
  errors: PropTypes.string,
  errorCode: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(LoginFailureMessage);

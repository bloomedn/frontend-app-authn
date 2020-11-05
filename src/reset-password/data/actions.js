import { AsyncActionType } from '../../data/utils';

export const RESET_PASSWORD = new AsyncActionType('RESET', 'PASSWORD');
export const VALIDATE_TOKEN = new AsyncActionType('VALIDATE', 'TOKEN');

// Validate confirmation token
export const validateToken = (token) => ({
  type: VALIDATE_TOKEN.BASE,
  payload: { token },
});

export const validateTokenBegin = () => ({
  type: VALIDATE_TOKEN.BEGIN,
});

export const validateTokenSuccess = (tokenStatus, token) => ({
  type: VALIDATE_TOKEN.SUCCESS,
  payload: { tokenStatus, token },
});

export const validateTokenFailure = (tokenStatus) => ({
  type: VALIDATE_TOKEN.FAILURE,
  payload: { tokenStatus },
});

// Reset Password
export const resetPassword = (formPayload, token) => ({
  type: RESET_PASSWORD.BASE,
  payload: { formPayload, token },
});

export const resetPasswordBegin = () => ({
  type: RESET_PASSWORD.BEGIN,
});

export const resetPasswordSuccess = data => ({
  type: RESET_PASSWORD.SUCCESS,
  payload: { data },
});

export const resetPasswordFailure = errors => ({
  type: RESET_PASSWORD.FAILURE,
  payload: { errors },
});
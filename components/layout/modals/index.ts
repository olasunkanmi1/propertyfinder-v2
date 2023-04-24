import dynamic from 'next/dynamic'

export const SignInModal = dynamic(() => import('./sign-in'));
export const SignUpModal = dynamic(() => import('./sign-up'));
export const ForgotPasswordModal = dynamic(() => import('./forgot-password'));
export const ForgotPasswordEmailSentModal = dynamic(() => import('./forgot-password-success'));
export const VerifyEmailSentModal = dynamic(() => import('./verify-email-success'));
export const EditProfileModal = dynamic(() => import('./edit-profile'));
export const ChangePasswordModal = dynamic(() => import('./change-password'));
export const ClearSavedPropertiesModal = dynamic(() => import('./clear-saved-properties'));

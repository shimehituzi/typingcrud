import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SignInForm = {
  email: string
  password: string
}

type SignUpForm = {
  email: string
  password: string
  verificationCode: string
  isSignUpForm: boolean
}

type ForgotPasswordForm = {
  email: string
  newPassword: string
  verificationCode: string
  isSendEmailForm: boolean
}

type AuthForm = {
  signInForm: SignInForm
  signUpForm: SignUpForm
  forgotPasswordForm: ForgotPasswordForm
}

const initialState: AuthForm = {
  signInForm: {
    email: '',
    password: ''
  },
  signUpForm: {
    email: '',
    password: '',
    verificationCode: '',
    isSignUpForm: true
  },
  forgotPasswordForm: {
    email: '',
    newPassword: '',
    verificationCode: '',
    isSendEmailForm: true
  }
}

const authForm = createSlice({
  name: 'authForm',
  initialState,
  reducers: {
    changeSignInForm: (state: AuthForm, action: PayloadAction<SignInForm>) => {
      state.signInForm = action.payload
    },
    setSignUpForm: (state: AuthForm, action: PayloadAction<Omit<SignUpForm, "isSignUpForm">>) => {
      state.signUpForm = {
        ...action.payload,
        isSignUpForm: state.signUpForm.isSignUpForm
      }
    },
    setIsSignUpForm: (state: AuthForm, action: PayloadAction<SignUpForm['isSignUpForm']>) => {
      state.signUpForm.isSignUpForm = action.payload
    },
    setForgotPasswordForm: (state: AuthForm, action: PayloadAction<Omit<ForgotPasswordForm, "isSendEmailForm">>) => {
      state.forgotPasswordForm = {
        ...action.payload,
        isSendEmailForm: state.forgotPasswordForm.isSendEmailForm
      }
    },
    setIsSendEmailForm: (state: AuthForm, action: PayloadAction<ForgotPasswordForm['isSendEmailForm']>) => {
      state.forgotPasswordForm.isSendEmailForm = action.payload
    }
  }
})

export default authForm

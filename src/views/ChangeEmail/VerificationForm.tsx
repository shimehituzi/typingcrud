import React, { useCallback } from 'react'

import { actions, thunkActions, useAppSelector, useAppDispatch } from 'state'


export const VerificationForm: React.FC = () => {
  const { isNewEmailForm, ...changeEmailForm } = useAppSelector(state => state.setting.changeEmailForm)

  const dispatch = useAppDispatch()
  type ChangeEmailForm = typeof changeEmailForm
  const changeForm = useCallback(
    (changeEmailForm: ChangeEmailForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(actions.setting.changeChangeEmailForm({
        ...changeEmailForm,
        [e.target.id]: e.target.value
      }))
    }, [dispatch]
  )
  const verifyNewEmail = useCallback(
    () => dispatch(thunkActions.setting.verifyNewEmail()), [dispatch]
  )
  
  return (
    <React.Fragment>
      <input
        type='text'
        id='verificationCode'
        placeholder='verification code'
        value={changeEmailForm.verificationCode}
        onChange={changeForm(changeEmailForm)}
      />
      <button onClick={verifyNewEmail}>verify</button>
    </React.Fragment>
  )
}
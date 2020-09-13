import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'

import { ThunkAPI } from 'utils/thunk'
import { thunkActions, AppState } from 'state'

type DeleteIndex = AppState['gameList']['gamearray'][0]['index']

export const deleteGame = createAsyncThunk<DeleteIndex, DeleteIndex, ThunkAPI>(
  'gameList/deleteGame',
  async (deleteIndex, thunkAPI) => {
    const userId = thunkAPI.getState().auth.userId
    const idToken = thunkAPI.getState().auth.tokens?.idToken

    const params = {
      index: deleteIndex,
      userId: userId,
    }

    const options: AxiosRequestConfig = {
      method: 'DELETE',
      headers: {
        Authorization: idToken
      },
      params: params,
      url: process.env.REACT_APP_API_BASE + "game",
    }

    axios(options)
      .then((res) => {
        console.log(res)
      })
      .catch(() => {
        thunkAPI.dispatch(thunkActions.auth.updateTokens())
        options.headers.Authorization = thunkAPI.getState().auth.tokens?.idToken
        return axios(options)
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.error(err)
          })
      })
    
    return deleteIndex
  }
)
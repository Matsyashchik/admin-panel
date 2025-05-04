import {message} from 'antd'
import {call, put} from 'redux-saga/effects'

export function* handleApiRequest(apiCall: () => Promise<never>, successAction: (response: any) => any, failureAction: (error: string) => any, successMessage?: string): Generator {
  try {
    const response: any = yield call(apiCall)
    yield put(successAction(response))

    if (successMessage) {
      message.success(successMessage)
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'Неизвестная ошибка'
    yield put(failureAction(errorMessage))
    message.error(errorMessage)
  }
}

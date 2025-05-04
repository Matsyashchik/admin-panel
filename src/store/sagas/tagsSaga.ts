import {takeLatest} from 'redux-saga/effects'

import {api} from 'services/apiService'
import {handleApiRequest} from 'services/sagaUtils'
import {fetchTagsFailure, fetchTagsRequest, fetchTagsSuccess} from 'store/slices/tagsSlice'


function* fetchTagsSaga(): Generator {
  yield handleApiRequest(
    () => api.get('manage/tags'),
    (response: any) => fetchTagsSuccess({tags: response.data}),
    fetchTagsFailure,
  )
}

export function* tagsSaga() {
  yield takeLatest(fetchTagsRequest.type, fetchTagsSaga)
}

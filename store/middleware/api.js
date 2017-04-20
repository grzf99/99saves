export default (api) => ({ dispatch, getState }) => (next) => (action) => {
  if (!action.api) {
    return next(action);
  }

  const { currentUser } = getState()
  const {
    types,
    method,
    data,
    url,
    onRequest,
    onSuccess,
    onFailure
  } = action.api
  const [request, success, failure] = types

  dispatch({ type: request })
  if (onRequest) {
    onRequest()
  }

  return api({
    url,
    method,
    data
  })
  .then((response) => {
    dispatch({ type: success, payload: response.data })
    if (onSuccess) {
      onSuccess(response.data)
    }
  })
  .catch((error) => {
    dispatch({ type: failure, error })
    if (onFailure) {
      onFailure(error)
    }
  })
}

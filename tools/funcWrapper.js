module.exports = {
  // Wraps a promise in a promise which will resolve
  // in a object containing data or error
  wrapper: (promise) => {
    return promise
      .then(data => ({
        data: data,
        error: null
      }))
      .catch(error => ({
        data: null,
        error: error
      }))
  }

}

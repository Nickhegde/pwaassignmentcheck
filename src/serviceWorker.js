// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA



export function register(config) {

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register(`${window.location.port === "7000" ? 'service-worker.js' : 'sw.js'}`).then(function (registration) {
        console.log('Worker registration is successful', registration.scope);
      }, function (err) {
        console.log('Worker registration has failed', err);
      }).catch(function (err) {
        console.log("err", err);
      });
    });
  } else {
    console.log('Service Worker is not supported by your browser.');
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}

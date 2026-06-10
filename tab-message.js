(function () {
  var original = document.title;
  var away = document.documentElement.dataset.tabAway || '👋 come back';
  document.addEventListener('visibilitychange', function () {
    document.title = document.visibilityState === 'hidden' ? away : original;
  });
})();

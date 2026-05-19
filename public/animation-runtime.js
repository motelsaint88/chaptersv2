/* Aagontuk safe animation runtime. Use this for small DOM/CSS effects without crashing the app. */
(function(){
  if (window.AEAnimations) return;
  const modules = [];
  function register(name, fn) {
    if (typeof fn !== 'function') return;
    modules.push({ name, fn });
    runOne(name, fn);
  }
  function runOne(name, fn) {
    try {
      const cleanup = fn();
      if (typeof cleanup === 'function') {
        window.addEventListener('beforeunload', cleanup, { once: true });
      }
    } catch (err) {
      console.warn('[Aagontuk animation skipped]', name, err);
    }
  }
  function rerun() { modules.forEach(({name, fn}) => runOne(name, fn)); }
  window.AEAnimations = { register, rerun };
})();

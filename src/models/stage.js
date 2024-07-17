global.Stage = function(data) {

  const $pages = data.pages;

  function getPages() { return $pages; }

  return Object.freeze({
    getPages
  });
}

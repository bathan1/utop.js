module.exports = function stripRelativeJsExtensions(source) {
  return source.replaceAll(
    /(from\s+["']\.{1,2}\/[^"']*?)\.js(["'];?)$/gm,
    "$1$2",
  );
};

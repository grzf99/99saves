module.exports = (filename, total = 3) => {
  const [name, extension] = filename.split('.');
  return Array.from(new Array(total), (x, i) => `/static/images/${name}${i > 0 ? `@${i + 1}x` : ''}.${extension} ${i + 1}x`).join(', ');
};

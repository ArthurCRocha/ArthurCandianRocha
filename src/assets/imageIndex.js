// Mapa de imagens resolvidas pelo Vite em build time.
// Evita paths absolutos tipo "/src/assets/..." (que não existem em produção)
// e paths com espaços/acentos indo pro HTML final: o Vite copia cada arquivo
// pra dist/ com um nome hasheado e a gente só referencia a chave relativa.
const files = import.meta.glob('./**/*.{png,jpg,jpeg,jfif}', {
  eager: true,
  import: 'default',
});

const index = {};
for (const path in files) {
  const key = path.replace(/^\.\//, '');
  index[key] = files[path];
}

export function resolveImage(relativePath) {
  if (!relativePath) return null;
  const resolved = index[relativePath];
  if (!resolved && import.meta.env.DEV) {
    console.warn(`[imageIndex] imagem não encontrada: ${relativePath}`);
  }
  return resolved || null;
}

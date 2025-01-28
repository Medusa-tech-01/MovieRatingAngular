
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {},
  assets: {
    'index.csr.html': {size: 4913, hash: '90fe5616c0bcda83cca01930768859fc236d2f2497db371a5b32094b7ae41937', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1029, hash: 'b76cd1c077f292284466953f11b69a365975a464949da1cf9158a334184f3e6d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-5XR6DVYU.css': {size: 315271, hash: 'nxbzCijeD8U', text: () => import('./assets-chunks/styles-5XR6DVYU_css.mjs').then(m => m.default)}
  },
};

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
export const API_BASE = isLocal
  ? 'http://localhost:3001'
  : 'https://TU-BACKEND.onrender.com'  // ← sustituye con tu URL de Render

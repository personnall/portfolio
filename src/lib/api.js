const API_URL = '/api/index.php'; // Works when hosted with PHP or proxy

export const api = {
  async request(action, module = '', data = null, method = 'GET') {
    const token = localStorage.getItem('mianos_token');
    const url = `${API_URL}?action=${action}&module=${module}` + (action === 'delete' ? `&id=${data}` : '');

    const options = {
      method: method === 'GET' && (action === 'save' || action === 'login') ? 'POST' : method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    };

    if (data && action !== 'delete') options.body = JSON.stringify(data);

    const res = await fetch(url, options);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Server error');
    return json;
  },

  get: (module) => api.request('get', module),
  save: (module, data) => api.request('save', module, data, 'POST'),
  delete: (module, id) => api.request('delete', module, id, 'DELETE'),
  login: (password) => api.request('login', '', { password }, 'POST')
};

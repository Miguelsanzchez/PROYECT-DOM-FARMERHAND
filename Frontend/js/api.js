
const BASE_URL = 'http://localhost:3001'

export async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem('token')

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}`}),
        ...options.headers
    }

    const res = await fetch (`${BASE_URL}${endpoint}`,{
        ...options,
        headers
    })
    
    let data
    const contentType = res.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
        data = await res.json()
    } else {
        data = { error: await res.text() }
    }

    if (!res.ok) {
        throw new Error(data.error || 'Error en la petición')
   
    }
     return data
    }



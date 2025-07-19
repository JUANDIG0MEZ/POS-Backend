document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const error = document.getElementById('error')
  try {
    console.log({ email, contrasenia: password })
    const response = await fetch('http://auth.localhost:3000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, contrasenia: password })

    })
    if (response.ok) {
      window.location.href = 'http://localhost:5173/'
    } else {
      const data = await response.json()
      error.textContent = data.message || 'Credenciales incorrectas'
    }
  } catch {
    error.textContent = 'Error al conectar al servidor'
  }
})

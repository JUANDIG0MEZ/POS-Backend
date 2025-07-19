document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault()

  const params = new URLSearchParams(window.location.search)
  const token = params.get('token')

  const email = document.getElementById('email').value
  const succesfulMessage = document.getElementById('succesfulMessage')
  const errorMessage = document.getElementById('errorMessage')
  try {
    console.log('email')
    const response = await fetch('http://auth.localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, token })

    })
    if (response.ok) {
      document.getElementById('register').style.display = 'none'
      succesfulMessage.style.display = 'block'
    } else {
      const data = await response.json()
      errorMessage.textContent = data.message || 'Error al registrar'
    }
  } catch {
    errorMessage.textContent = 'Error de red o servidor'
  }
})

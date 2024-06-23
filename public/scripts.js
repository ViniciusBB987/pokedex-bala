document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const response = await fetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: formData.get('username'),
                    password: formData.get('password'),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);
                window.location.href = 'pokemons.html';
            } else{
                alert('Falha no login');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
          event.preventDefault();
          const formData = new FormData(registerForm);
          const response = await fetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify({
              username: formData.get('username'),
              password: formData.get('password'),
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            alert('Registration successful');
            window.location.href = 'login.html';
          } else {
            alert('Registration failed');
          }
        });
      }
    
      const token = localStorage.getItem('token');
      const pokemonList = document.getElementById('pokemonList');
    
      if (token && pokemonList) {
        fetch('/pokemon', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            data.forEach((pokemon) => {
              const li = document.createElement('li');
              li.textContent = pokemon.name;
              pokemonList.appendChild(li);
            });
          })
          .catch((error) => {
            console.error('Error fetching pokemon data:', error);
          });
      }
    
      const search = document.getElementById('search');
      if (search) {
        search.addEventListener('input', (event) => {
          const query = event.target.value.toLowerCase();
          const items = pokemonList.getElementsByTagName('li');
          for (const item of items) {
            const isVisible = item.textContent.toLowerCase().includes(query);
            item.style.display = isVisible ? '' : 'none';
          }
        });
      }
    });
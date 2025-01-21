<template>
  <div class="auth-container">
    <h1 v-if="isLogin">Connexion</h1>
    <h1 v-else>Inscription</h1>

    <div class="social-login">
      <button class="social-btn google" @click="loginWith('google')">
        <i class="fab fa-google"></i>
        <span>Google</span>
      </button>
      <button class="social-btn github" @click="loginWith('github')">
        <i class="fab fa-github"></i>
        <span>GitHub</span>
      </button>
    </div>

    <form @submit.prevent="onSubmit" class="auth-form">
      <div v-if="!isLogin" class="form-group">
        <label for="firstname">Prénom</label>
        <input
          id="firstname"
          v-model="firstname"
          type="text"
          placeholder="Entrez votre prénom"
        />
      </div>

      <div v-if="!isLogin" class="form-group">
        <label for="lastname">Nom</label>
        <input
          id="lastname"
          v-model="lastname"
          type="text"
          placeholder="Entrez votre nom"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Entrez votre email"
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Entrez votre mot de passe"
        />
      </div>
      <p style="color: red;" v-if="errorMessage">{{errorMessage}}</p>

      <div class="form-group">
        <button type="submit" class="submit-btn">
          {{ isLogin ? 'Se connecter' : 'S\'inscrire' }}
        </button>
      </div>
    </form>

    <p class="switch-mode">
      <span v-if="isLogin">Pas encore de compte ?</span>
      <span v-else>Déjà un compte ?</span>

      <button @click="toggleMode" class="switch-btn">
        {{ isLogin ? 'Créer un compte' : 'Se connecter' }}
      </button>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';

const isLogin = ref(true)

const errorMessage = ref(null)

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')

const toggleMode = () => {
  errorMessage.value = null
  isLogin.value = !isLogin.value

  firstname.value = ''
  lastname.value = ''
  email.value = ''
  password.value = ''
}

const loginWith = (provider) => {
  console.log(`Tentative de connexion avec ${provider}`);
  document.location.href = `http://localhost:3000/auth/${provider}`;
}

const onSubmit = async () => {
  if (isLogin.value) {
    try {
      await axios.post('http://localhost:3000/users/login', {
        mail: email.value,
        password: password.value
      }, {
        withCredentials: true
      });
      window.location.reload();
    }catch (e) {
      errorMessage.value = e.response.data.message;
    }
  } else {
    try {
      await axios.post('http://localhost:3000/users/register', {
        firstname: firstname.value,
        lastname: lastname.value,
        mail: email.value,
        password: password.value
      }, {
        withCredentials: true
      });
      window.location.reload();
    }catch (e) {
      errorMessage.value = e.response.data.message;
    }
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.social-login {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1rem;
}

.social-btn {
  display: flex;
  align-items: center;
  border: none;
  background: #f1f1f1;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  gap: 0.5rem;
}

.social-btn:hover {
  background: #e2e2e2;
}

.google {
  color: #db4437;
}

.github {
  color: #333;
}

.twitter {
  color: #1da1f2;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.4rem;
  font-weight: bold;
}

.form-group input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  background-color: #3f51b5;
  color: white;
  font-weight: bold;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #2c3e9e;
}

.switch-mode {
  text-align: center;
  margin-top: 1rem;
}

.switch-btn {
  border: none;
  background: transparent;
  color: #3f51b5;
  cursor: pointer;
  font-weight: bold;
  margin-left: 0.3rem;
}
</style>

<template>
  <div class="home-page">
    <header class="header">
      <h1>Bienvenue {{store.getters.isAuthenticated['firstname']}}</h1>
      <button class="logout-btn" @click="logout">Déconnexion</button>
      <button class="logout-btn" style="background-color: green;" @click="router.push({name: 'announcementCreate'})">Create Announcement</button>
    </header>

    <main v-if="annonces" class="card-container">
      <div
        v-for="(annonce, index) in annonces"
        :key="index"
        class="card"
      >
        <img
          v-if="annonce.image"
          :src="annonce.image"
          alt="Illustration de l'annonce"
          class="card-image"
        />
        <div class="card-content">
          <h2 class="card-title">{{ annonce.title }}</h2>
          <p class="card-description">{{ annonce.description }}</p>
          <p class="card-author">Auteur : {{ annonce.user.firstname }}</p>
        </div>
        <button class="voir-btn" @click="voirAnnonce(annonce)">Voir</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import store from '../store/index.js';
import axios from 'axios';
import router from '../router/index.js';

const annonces = ref(null);

const logout = async () => {
  await axios.post("http://localhost:3000/users/logout", null, {
    withCredentials: true
  });
  window.location.reload();
}

const voirAnnonce = (annonce) => {
  router.push({name: 'announcementDetail', params: {id: annonce.id}});
}

onBeforeMount(async () => {
  const response = await axios.get('http://localhost:3000/announcements', {
    withCredentials: true
  });
  annonces.value = response.data;
})
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 1rem;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.logout-btn {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.card {
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
}

.card-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
  flex: 1;
}

.card-title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
}

.card-description {
  flex: 1;
  margin-bottom: 0.5rem;
}

.card-author {
  font-style: italic;
  font-size: 0.9rem;
  color: #666;
}

.voir-btn {
  background-color: #3f51b5;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 0 0 8px 8px;
  cursor: pointer;
  align-self: flex-end;
}

.voir-btn:hover {
  background-color: #2c3e9e;
}
</style>

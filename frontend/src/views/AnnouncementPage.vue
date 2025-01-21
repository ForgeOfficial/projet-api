<template>
  <div class="announcement-detail">
    <header class="detail-header">
      <h1>Détail de l'annonce</h1>
      <button @click="goBack" class="back-btn">Retour</button>
      <button
        v-if="
          announcement &&
          announcement.user.id === store.getters.isAuthenticated['id']
        "
        @click="deleteAnnouncement"
        class="back-btn"
        style="background-color: red;"
      >
        Delete
      </button>
      <button
        v-if="
          announcement &&
          announcement.user.id === store.getters.isAuthenticated['id']
        "
        @click="router.push({name: 'announcementUpdate', params: { id: announcement.id }})"
        class="back-btn"
        style="background-color: green;"
      >
        Update
      </button>
    </header>

    <div v-if="announcement" class="detail-content">
      <img
        v-if="announcement.image"
        :src="announcement.image"
        :alt="announcement.title"
        class="detail-image"
      />
      <h2 class="detail-title">{{ announcement.title }}</h2>
      <p class="detail-author">Auteur : {{ announcement.user.firstname }}</p>
      <p class="detail-description">{{ announcement.description }}</p>
    </div>

    <div v-else class="not-found">
      <p>Annonce introuvable.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import store from '../store/index.js';

const route = useRoute();
const router = useRouter();

const announcement = ref(null);

const deleteAnnouncement = async () => {
  await axios.delete(
    'http://localhost:3000/announcements/' + route.params.id,
    {
      withCredentials: true,
    },
  );
  await router.push({name: 'home'})
}

onMounted(async () => {
  const announcementId = route.params.id;
  const response = await axios.get(
    'http://localhost:3000/announcements/' + announcementId,
    {
      withCredentials: true,
    },
  );
  announcement.value = response.data;
});

const goBack = () => {
  router.push({name: 'home'})
};
</script>

<style scoped>
.announcement-detail {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 1rem;
  font-family: Arial, sans-serif;
}

.detail-header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 1rem;
}

.back-btn {
  background-color: #3f51b5;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.back-btn:hover {
  background-color: #2c3e9e;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 4px;
}

.detail-title {
  font-size: 1.5rem;
  margin: 0;
}

.detail-author {
  font-style: italic;
  color: #555;
}

.detail-description {
  font-size: 1rem;
  line-height: 1.4;
}

.not-found {
  text-align: center;
  color: #888;
  margin-top: 2rem;
}
</style>

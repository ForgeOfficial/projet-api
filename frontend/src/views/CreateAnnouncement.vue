<template>
  <div class="create-announcement">
    <h1>Créer une annonce</h1>
    <form @submit.prevent="createAnnouncement" class="form-create">
      <div class="form-group">
        <label for="title">Titre</label>
        <input
          id="title"
          v-model="title"
          type="text"
          placeholder="Entrez le titre de l'annonce"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="description"
          placeholder="Entrez la description de l'annonce"
          rows="4"
        />
      </div>

      <div class="form-group">
        <label for="image">URL de l'image</label>
        <input
          id="image"
          v-model="image"
          type="text"
          placeholder="https://exemple.com/image.jpg"
        />
      </div>

      <button type="submit" class="submit-btn">Créer l'annonce</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '../router/index.js';

const title = ref('');
const description = ref('');
const image = ref('');

const createAnnouncement = async () => {
  const response = await axios.post(
    'http://localhost:3000/announcements',
    {
      title: title.value,
      description: description.value,
      image: image.value,
    },
    { withCredentials: true },
  );
  router.push({name: 'announcementDetail', params: { id: response.data.id }});
};
</script>

<style scoped>
.create-announcement {
  max-width: 600px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.form-create {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 8px;
  background: #fafafa;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.3rem;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  align-self: flex-end;
  background-color: #3f51b5;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.submit-btn:hover {
  background-color: #2c3e9e;
}
</style>

<template>
  <header>
    <nav class="navbar bg-dark">
      <div class="container flex-nowrap">
        <a class="navbar-brand" href="/">
          <img :src="headerLogo" alt="Logo">
        </a>
        <a @click="logOut" class="navbar-brand text-white icon-link icon-link-hover logout" href="#">
          Выйти
          <i class="ms-1 bi bi-box-arrow-right logout_icon" />
        </a>
      </div>
    </nav>
  </header>

  <main class="bg-light">
    <div class="container vh-100">

      <div class="row">
        <div class="col">
          <h1 class="my-4">Личный кабинет</h1>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="container p-3 rounded text-white user-header">
            <div class="row">
              <div class="col-12 col-sm-5 col-md-4 col-lg-3">
                <img :src="photoUrl" class="img-thumbnail" alt="Avatar" />
              </div>
              <div class="col-12 col-sm">
                <div class="d-flex flex-column">

                  <h2 class="display-6">{{ user.name }}</h2>
                  <p>{{ user.position ? user.position : "Должность не указана" }}</p>

                  <div class="d-flex flex-column align-self-start gap-2">

                    <a :href="user.telegram ? `https://t.me/${user.telegram}` : '#'"
                      class="d-flex flex-nowrap text-decoration-none text-white">
                      <i class="bi bi-telegram text-secondary me-2"></i>
                      <span>{{ user.telegram ? user.telegram : "Не указан" }}</span>
                    </a>

                    <div class="d-flex flex-nowrap">
                      <i class="bi bi-envelope-fill text-secondary me-2"></i>
                      <span>{{ user.email }}</span>
                    </div>

                    <div class="d-flex flex-nowrap text-nowrap">
                      <i class="bi bi-telephone-fill text-secondary me-2"></i>
                      <span>{{ user.phone }}</span>
                    </div>

                    <div class="text-white-50">Дата регистрации: {{ user.regDate }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import headerLogo from '../assets/header_logo.svg'

const router = useRouter()
const users = useUsersStore()

users.getUsers()
const user = { ...users.currentUser, regDate: formatDate(users.currentUser.regDate) }

const photoUrl = computed(() => new URL(`../assets/${user.photo}`, import.meta.url).href)

function formatDate(date) {
  return new Date(date).toLocaleDateString()
}

function logOut() {
  localStorage.removeItem('currentUser')
  users.currentUser = null
  router.push({ path: '/login' })
}
</script>

<style>
.logout i::before {
  vertical-align: unset;
}

.user-header {
  animation: userBackground 20s linear infinite;
  background: #0F2139 url('../assets/userBG.png') no-repeat;
}

@keyframes userBackground {
  0% {
    background-position: 90% 1rem
  }

  to {
    background-position: 90% -30rem
  }
}
</style>
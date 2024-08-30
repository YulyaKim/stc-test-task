<template>
  <main class="bg-light">
    <div class="container vh-100">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-auto">
          <div class="card shadow">
            <div class="card-body p-4">
              <form ref="regForm" class="d-flex flex-column">
                <div class="mb-4">
                  <h5 class="card-title">Создать учетную запись</h5>
                  <div class="d-flex align-items-center flex-nowrap card-subtitle gap-1">
                    <span>или</span>
                    <button type="button" class="btn btn-link p-0 text-decoration-none" @click="router.push('/login')">
                      войти в личный кабинет
                    </button>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="name" class="form-label label-required">Имя</label>
                  <input v-model="credentials.name" type="text" class="form-control" id="name" required>
                </div>

                <div class="mb-3">
                  <label for="login" class="form-label label-required">Логин</label>
                  <input v-model="credentials.login" type="text" class="form-control" id="login" required>
                </div>

                <div class="mb-3">
                  <label for="phone" class="form-label label-required">Номер телефона</label>
                  <input v-model="credentials.phone" class="form-control" id="phone" required>
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label label-required">Электронная почта</label>
                  <input v-model="credentials.email" type="email" class="form-control" id="email" required>
                </div>

                <div class="mb-4">
                  <label for="password" class="form-label label-required">Пароль</label>
                  <input v-model="credentials.password" type="password" class="form-control" id="password" required>
                </div>

                <button @click.prevent="register" type="submit" class="btn btn-primary">Подтвердить</button>
              </form>

              <div ref="registerSuccess" class="d-none">
                <h5 class="card-title mb-4">Пользователь зарегистрирован</h5>
                <button type="button" class="btn btn-primary" @click="router.push('/login')">Войти в личный
                  кабинет</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUsersStore } from '@/stores/users'
import { useRouter } from 'vue-router'

const router = useRouter()

const users = useUsersStore()
users.getUsers()

const regForm = ref(null)

const credentialsDefault = {
  name: '',
  login: '',
  position: '',
  telegram: '',
  phone: '',
  email: '',
  password: '',
  photo: 'defaultPhoto.jpg'
}

const credentials = reactive({
  name: '',
  login: '',
  position: '',
  telegram: '',
  phone: '',
  email: '',
  password: '',
  photo: 'defaultPhoto.jpg'
})

const registerSuccess = ref(null)

function register() {
  if (!regForm.value.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
    regForm.value.classList.add('was-validated')
  } else {
    regForm.value.classList.add('was-validated')
    const existingUsers = JSON.parse(localStorage.getItem('users'))
    existingUsers.push({ ...credentials, regDate: new Date() })
    localStorage.setItem('users', JSON.stringify(existingUsers))
    users.usersList = existingUsers

    regForm.value.reset()
    credentials.value = credentialsDefault
    regForm.value.classList.remove('was-validated')

    regForm.value.classList.remove('d-flex')
    regForm.value.style.display = 'none'

    registerSuccess.value.classList.remove('d-none')
    registerSuccess.value.style.display = 'block'
  }
}
</script>

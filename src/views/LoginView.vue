<template>
  <main class="bg-light">
    <div class="container vh-100">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-auto">
          <div class="card shadow">
            <div class="card-body p-4">
              <div class="mb-4">
                <h5 class="card-title">Войти в личный кабинет</h5>
                <div class="d-flex align-items-center flex-nowrap card-subtitle gap-1">
                  <span>или</span>
                  <button type="button" class="btn btn-link p-0 text-decoration-none" @click="router.push('/register')">
                    создать учетную запись
                  </button>
                </div>
              </div>
              <form ref="loginForm" class="d-flex flex-column">
                <div class="mb-3">
                  <label for="emailPhone" class="form-label label-required">{{ loginModeLabel }}</label>
                  <input v-model="emailPhone" type="text" class="form-control" id="emailPhone" required>
                  <div class="invalid-feedback">
                    Поле обязательно для заполнения
                  </div>
                </div>
                <div v-if="loginMode == 'password'" class="mb-3">
                  <label for="password" class="form-label label-required">Пароль</label>
                  <input v-model="password" type="password" class="form-control" id="password" required>
                  <div class="invalid-feedback">
                    Поле обязательно для заполнения
                  </div>
                </div>
                <button type="button" class="btn btn-link px-0 align-self-start text-decoration-none"
                  @click="changeLoginMode">
                  Войти по {{ loginModeName }}
                </button>
                <button type="button" class="btn btn-primary my-2" @click="login">Продолжить</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUsersStore } from '@/stores/users'
import { useRouter } from 'vue-router'

const router = useRouter()

const users = useUsersStore()
users.getUsers()

let loginMode = ref('code')

const loginForm = ref()

let emailPhone = ref()
let password = ref()

const loginModeLabel = computed(() => {
  return loginMode.value == 'code' ? 'Email / номер телефона' : 'Email / номер телефона / логин'
})

const loginModeName = computed(() => {
  return loginMode.value == 'code' ? 'паролю' : 'коду'
})

function changeLoginMode() {
  loginMode.value == 'code' ? loginMode.value = 'password' : loginMode.value = 'code'
}

const confirmationCode = ref()

function login() {
  if (!loginForm.value.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
    loginForm.value.classList.add('was-validated')
  } else {
    loginForm.value.classList.add('was-validated')
    // Вход по коду
    if (loginMode.value == 'code') {
      console.log(users.usersList)
      const userIndex = users.usersList.findIndex(item => item.email === emailPhone.value || item.phone === emailPhone.value)

      if (userIndex != -1) {
        const propertyName = ref('')
        Object.entries(users.usersList[userIndex]).map(
          ([key, value]) => {
            if (value === emailPhone.value) {
              key == 'email' ? propertyName.value = 'почту' : propertyName.value = 'телефон'
            }
          }
        )

        confirmationCode.value = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
        let codePromptAnswer = prompt(`Пожалуйста, введите четырехзначный код, отправленный на ${propertyName.value} (Вот он: ${confirmationCode.value})`, confirmationCode.value)

        if (codePromptAnswer == confirmationCode.value) {
          localStorage.setItem('currentUser', JSON.stringify(users.usersList[userIndex]))
          users.currentUser = users.usersList[userIndex]
          router.push('/')
        } else {
          alert('Код введен неверно')
        }
      } else {
        alert('Пользователь не наден')
      }
    } else {
      // Вход по паролю
      const userIndex = users.usersList.findIndex(item => item.email === emailPhone.value || item.phone === emailPhone.value || item.login === emailPhone.value)
      if (userIndex != -1) {
        if (users.usersList[userIndex].password == password.value) {
          localStorage.setItem('currentUser', JSON.stringify(users.usersList[userIndex]))
          users.currentUser = users.usersList[userIndex]
          router.push('/')
        } else {
          alert('Пароль введен неверно')
        }
      } else {
        alert('Пользователь не наден')
      }
    }
  }
}
</script>

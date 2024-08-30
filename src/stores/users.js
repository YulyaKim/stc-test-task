import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => {
    return { 
      usersList: JSON.parse(localStorage.getItem('users')),
      currentUser: JSON.parse(localStorage.getItem('currentUser'))
    }
  },
  actions: {
    getUsers() {
      if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([{
          login: 'yuuliakim',
          name: 'Юлия Ким',
          position: 'Соискатель на позицию "Frontend разработчик"',
          telegram: 'yuuliakim',
          phone: '89507017570',
          email: 'yuulia.kim@gmail.com',
          password: '123456',
          regDate: '2024-08-29T03:02:59.475Z',
          photo: 'Iuliia_Kim2.jpg'
        }]))
        this.usersList = JSON.parse(localStorage.getItem('users'))
      }
    }
  }
})

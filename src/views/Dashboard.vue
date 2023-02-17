<template>
  <div>
    <!-- <h1>Dashboard</h1>
    <template v-if="events !== 'Loading events...'">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
      />
    </template>
    <br>
    <span
      class="clickBtn"
      @click="logout"
    >Logout</span> -->
  </div>
</template>

<script>
// import axios from 'axios'
// import EventCard from '../components/EventCard.vue'

export default {
  // components: { EventCard },
  data() {
    return { events: 'Loading events...' }
  },
  created() {
    // axios.get(process.env.VUE_APP_API_URL + 'api/dashboard').then(({ data }) => {
    //   console.log('Dashboard data->', data)

    //   const testData = {
    //     'name': data.name,
    //     'email': data.email,
    //     'password': data.password,
    //     'id': data.id,
    //     'title': data.title,
    //     'time': data.time,
    //     'date': data.date
    //   }

    //   this.events = { testData }
    // })
  },
  methods: {
    // initData(string) {
    //   const DD = JSON.parse(string)
    //   console.log('DD->', DD)
    // },
    // logout() {
    //   console.log('logout233')
    //   this.$router.push('/')
    //   this.$store.dispatch('logout')
    // }
  }
}
</script>

<style>
.clickBtn {
  background-color: rgb(71, 149, 252);
}
</style>

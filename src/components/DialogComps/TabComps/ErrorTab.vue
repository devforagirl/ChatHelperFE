<template>
  <div class="ErrorTabBigBox">
    <div class="listGroupBox">
      <v-list v-if="arrException.length !==0">
        <v-list-group
          v-for="item in arrException"
          :key="item.timestamp"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.timestamp" />
            </v-list-item-content>
          </template>
          <v-list-item>
            <v-list-item-content>
              from: {{ item.from }}
              <br>
              type: {{ item.type }}
              <br>
              content: {{ item.content }}
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <div v-else>No records</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({}),
  computed: {
    ...mapState(['arrException'])
  },
  mounted() { },

  methods: {}
}
</script>

<style>
</style>

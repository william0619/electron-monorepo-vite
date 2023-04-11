<template>
  <button @click="increment">my button</button>
  <img alt="Vue logo" class="logo" :src="logo3" width="45" height="45" />

  <div>{{ count }}</div>
</template>

<!--<script lang="ts">-->
<!--import { defineComponent } from 'vue'-->

<!--export default defineComponent({-->
<!--  name: 'Button'-->
<!--})-->
<!--</script>-->

<script setup lang="ts">
import logo3 from '../../assets/logo3.png'

import { reactive, ref } from 'vue'

const props = defineProps<{ text?: string }>()
const count = ref(0)

const increment = () => {
  count.value++
}
</script>

<style scoped></style>

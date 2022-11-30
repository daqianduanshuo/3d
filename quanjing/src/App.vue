<script setup lang="ts">

import {onMounted} from "vue";
import {SceneObjects} from "./classes/SceneObject";

onMounted(() => {  
  const container = document.getElementById("container") as HTMLElement;
  const object = new SceneObjects(container,{width:window.innerWidth,height:window.innerHeight});
  object.loadRoomBG('/livingRoom.jpg');
})

</script>

<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<style scoped lang="scss">

</style>

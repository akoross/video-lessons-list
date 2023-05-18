<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';

import { useLessonsStore, LesssonInterface } from './stores/lessonsStore';
import { onMounted } from 'vue';

const store = useLessonsStore();
const lessons = ref<LesssonInterface[]>([]);
const lessonActive = ref<LesssonInterface>();
const playerContainer = ref<HTMLElement>();
const timer = ref(0);

const plyr = ref();

onMounted(() => {
  plyr.value.player.on('statechange', (e) => {
    console.log(e);
  });
});

// watch(player, ()=>{ console.log(player)})

onBeforeMount(async () => {
  await store.allLessons();
  lessons.value = store.lessons;
  lessonActive.value = lessons.value[0];
});

function lessonChoise(lesson: LesssonInterface) {
  const id: number = lesson.id;
  lessonActive.value = lessons.value[id - 1];
}

function playHandler() {
  console.log('sdfsdf');
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div
          class="logo flex justify-center gap-2 items-center font-extrabold text-3xl"
        >
          <Share class="h-10" />
          <span class="logo-text">Atom</span>
        </div>
      </el-header>
      <div class="el-container">
        <h1 class="text-2xl">
          Як заробляти від $100 на день на налаштуванні рекламних компаній
          Facebook+Instagram
        </h1>
      </div>
      <el-container class="gap-5">
        <el-main class="">
          <section class="lessons containerw-full">
            <div class="lesson flex flex-col">
              <h2 class="lesson-title text-end mb-5 text-lg">
                {{ lessonActive?.title }}
              </h2>
              <div class="w-full">
              <vue-plyr ref="plyr">
                <div class="plyr__video-embed w-full">
                  <iframe
                    :src="lessonActive?.video_url"
                    frameborder="0"
                    allow="accelerometer; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </vue-plyr>
            </div>
              <h2 class="lesson-subTitle text-xl">
                {{ lessonActive?.subtitle }}
              </h2>
              <div class="lesson-description text-base">
                {{ lessonActive?.description }}
              </div>
            </div>
          </section>
        </el-main>
        <el-aside class="flex flex-col justify-between" width="250px">
          <div class="memu p-5 flex flex-col m-0 gag-0">
            <button
              class="bg-[#b4c1cc] justify-start items-center text-lg cursor-pointer flex p-0 m-0 w-full border-0 gap-0"
              :class="{
                'bg-[#ff5c01]': lesson.id === lessonActive?.id,
                'hover:bg-[#ff5c01]': lesson.watched,
              }"
              v-for="lesson in lessons"
              :key="lesson.id"
              @click="lessonChoise(lesson)"
              :disabled="!lesson.watched"
            >
              <el-icon class="text-3xl h-20 w-20 justify-center m-0 p-0"
                ><VideoPlay
              /></el-icon>
              <el-text class="m-0 text-xl">{{ lesson.title }}</el-text>
            </button>
          </div>
          <el-footer class="flex flex-col h-auto pt-5 pb-5">
            <el-text>Вже переглянули? Отримайте доступ до наступного</el-text>

            <el-button>Наступний епізод</el-button>
          </el-footer>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.header {
  @apply h-[5rem];
  padding: 0.5em;
}
</style>

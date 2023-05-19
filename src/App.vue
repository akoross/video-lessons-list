<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { YoutubeVue3 } from 'youtube-vue3';

import { useLessonsStore, LesssonInterface } from './stores/lessonsStore';

const store = useLessonsStore();
const lessons = ref<LesssonInterface[]>([]);
const lessonActive = ref<LesssonInterface>();
const youtube = ref();
const seconds = ref(0);
const activateButton = ref(true);
const videoId = ref('');
const alertShow = ref(false);
let timerInterval: any;

onBeforeMount(async () => {
  await store.allLessons();
  lessons.value = store.lessons;
  lessonActive.value = lessons.value[store.lessonActive];
  videoId.value = lessonActive.value.video_url.split('/').slice(-1).join();
});

watch(seconds, (oldSec, newSec: number) => {
  if (newSec >= lessonActive.value?.video_time * 60) {
    stopTimer();
    seconds.value = 0;
    activateButton.value = false;
    alertShow.value = true;
  }
});

function startTimer() {
  timerInterval = setInterval(
    updateTimer,
    lessonActive.value?.video_time * 60 - seconds.value
  );
}

function updateTimer() {
  seconds.value++;
}

function stopTimer() {
  clearInterval(timerInterval); // Stop the timer
}

function onPaused() {
  stopTimer();
}
function onPlayed() {
  startTimer();
  updateTimer();
}

function onEnded() {
  stopTimer();
  seconds.value = seconds.value;
  activateButton.value = false;
  alertShow.value = true;
}

function nextVideo() {
  if (store.getLessonActive === lessons.value.length - 1) {
    return;
  }

  activateButton.value = true;
  seconds.value = 0;
  store.changeLessonActive();
  alertShow.value = false;

  lessonActive.value = lessons.value[store.getLessonActive];
  videoId.value = lessonActive.value.video_url.split('/').slice(-1).join();
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
                <div class="w-full">
                  <YoutubeVue3
                    class="w-full"
                    ref="youtube"
                    :videoid="videoId"
                    @ended="onEnded"
                    @paused="onPaused"
                    @played="onPlayed"
                  />
                </div>
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
            <div
              class="bg-[#b4c1cc] justify-start items-center text-lg flex p-0 m-0 w-full border-0 gap-0"
              :class="{
                'bg-[#ff5c01]': idx === store.getLessonActive,
              }"
              v-for="(lesson, idx) in lessons"
              :key="lesson.id"
            >
              <el-icon class="text-3xl h-20 w-20 justify-center m-0 p-0"
                ><VideoPlay
              /></el-icon>
              <el-text class="m-0 text-xl">{{ lesson.title }}</el-text>
            </div>
          </div>
          <el-footer class="flex flex-col h-auto pt-5 pb-5 gap-3">
            <el-text>Вже переглянули? Отримайте доступ до наступного</el-text>

            <el-button :disabled="activateButton" @click="nextVideo"
              >Наступний епізод</el-button
            >
          </el-footer>
        </el-aside>
      </el-container>
    </el-container>
  </div>
  <el-alert
    class="absolute top-0 w-fit p-5 ps-10 pe-10 end-0"
    v-if="alertShow"
    title="Ви можите переглянути наступне відео"
    type="success"
    show-icon
  />
</template>

<style scoped>
.header {
  @apply h-[5rem];
  padding: 0.5em;
}
</style>

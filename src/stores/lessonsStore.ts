import { defineStore } from 'pinia';

export interface LesssonInterface {
  id: number;
  title: string;
  subtitle: string;
  video_url: string;
  video_time: number;
  description: string;
  watched: boolean;
}

export const useLessonsStore = defineStore({
  id: 'lessons',
  state: () => ({
    lessons: [] as LesssonInterface[],
    lessonActive: 0,
  }),
  getters: {
    getLessons: (state) => state.lessons,
    getLessonActive: (state) => state.lessonActive,
  },
  actions: {
    async allLessons() {
      try {
        const response = await fetch('http://localhost:3000/lessons');
        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status);
        }

        const data = await response.json();
        this.lessons = data;
      } catch (error) {
        console.log(error);
      }
    },
    changeLessonActive() {
      this.lessons.length >= this.lessonActive - 1
        ? this.lessonActive++
        : this.lessonActive;
    },
  },
});

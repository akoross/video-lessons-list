import { defineStore } from 'pinia';

export interface LesssonInterface {
    id: number,
        title: string,
        subtitle: string,
        video_url: string,
        video_time: number,
        description: string,
        watched: boolean
      }

export const useLessonsStore = defineStore({
    id: "lessons",
    state: () => ({
        lessons: [] as LesssonInterface[]
    }),
    getters: {
        getLessons: (state) => state.lessons
    },
    actions: {
        async allLessons() {
            try {
            const response = await fetch('http://localhost:3000/lessons');
            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }

            const data = await response.json();
            // Handle the parsed JSON data
            this.lessons = data
            } catch (error) {
                console.log(error)
            }
        }

    }
})
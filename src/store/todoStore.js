import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const todoStatus = {
  Done: "done",
  Todo: "todo",
};

export const labels = [{ name: "Home" }, { name: "Food" }, { name: "Music" }];

export const priors = [
  { label: "Low", value: 0 },
  { label: "Medium", value: 1 },
  { label: "High", value: 2 },
];
export const useTodoStore = create(
  persist(
    (set) => ({
      todoText: "",
      selectedLabel: "",
      priority: priors[0].value,
      status: todoStatus.Todo,
      todoAllJob: [],

      setSelectedLabel: (label) => set({ selectedLabel: label }),
      setPriority: (prior) => set({ priority: prior }),
      setTodoText: (todo) => set({ todoText: todo }),
      removeTodoJob: (id) =>
        set((state) => ({
          todoAllJob: state.todoAllJob.filter((job) => job.id !== id),
        })),
      addTodoJob: () =>
        set((state) => ({
          todoAllJob: [
            ...state.todoAllJob,
            {
              id: Date.now(),
              todoText: state.todoText,
              label: state.selectedLabel,
              priority: state.priority,
              status: state.status,
            },
          ],
        })),
      updateTodoStatus: (id, newUpdate) => {
        console.log(newUpdate);
        set((state) => ({
          todoAllJob: state.todoAllJob.map((job) =>
            job.id === id ? { ...job, ...newUpdate } : job
          ),
        }));
      },

      resetTodoState: () =>
        set({
          todoText: "",
          selectedLabel: "",
          priority: priors[0].value,
        }),
    }),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({ todoAllJob: state.todoAllJob }),
    }
  )
);

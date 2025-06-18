import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import dayjs from "dayjs";

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

export const listAssignee = ["Nguyen Van A", "Nguyen Van B", "Nguyen Van C"];
export const useTodoStore = create(
  persist(
    (set) => ({
      todoText: "",
      selectedLabel: "",
      priority: priors[0].value,
      status: todoStatus.Todo,
      formatDeadlineToDay: "",
      deadline: "",
      assignee: "",
      todoAllJob: [],

      setSelectedLabel: (label) => set({ selectedLabel: label }),
      setPriority: (prior) => set({ priority: prior }),
      setTodoText: (todo) => set({ todoText: todo }),
      setDeadline: (date) => set({ deadline: date }),
      setAssignee: (name) => set({ assignee: name }),
      setFormatDeadline: (date) => set({ formatDeadlineToDay: date }),
      removeTodoJob: (id) =>
        set((state) => ({
          todoAllJob: state.todoAllJob.filter((job) => job.id !== id),
        })),
      addTodoJob: () =>
        set((state) => {
          let deadline;
          if (!state.deadline) {
            deadline = state.formatDeadlineToDay.toISOString();
          }
          return {
            todoAllJob: [
              ...state.todoAllJob,
              {
                id: Date.now(),
                todoText: state.todoText,
                label: state.selectedLabel,
                priority: state.priority,
                status: state.status,
                deadline: state.deadline || deadline,
                formatDeadlineToDay: state.formatDeadlineToDay,
                assignee: state.assignee,
              },
            ],
          };
        }),
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
          deadline: "",
          formatDeadlineToDay: dayjs().add(2, "hour"),
          assignee: "",
        }),
    }),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({ todoAllJob: state.todoAllJob }),
    }
  )
);

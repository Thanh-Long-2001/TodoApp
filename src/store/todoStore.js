import { create } from "zustand";

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
export const useTodoStore = create((set) => ({
  todoText: "",
  selectedLabel: "",
  priority: priors[0].value,
  status: todoStatus.Todo,
  todoAllJob: [],

  setSelectedLabel: (label) => set({ selectedLabel: label }),
  setPriority: (prior) => set({ priority: prior }),
  setTodoText: (todo) => set({ todoText: todo }),
  setTodoStatus: (status) => set({ status: status }),

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

  resetTodoState: () =>
    set({
      todoText: "",
      selectedLabel: "",
      priority: "",
    }),
}));

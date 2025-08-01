import { EditedTask } from "@/types"
import { create } from "zustand";

type State = {
    editedTask: EditedTask;
    updateEditedTask: (payload: EditedTask) => void;
    resetEditedTask: () => void;
}

const initialTaskState: EditedTask = { id: 0, title: '', description: '' }

const useStore = create<State>((set) => ({
    editedTask: initialTaskState,
    updateEditedTask: (payload) => set({ editedTask: payload }),
    resetEditedTask: () => set({ editedTask: initialTaskState })
}))

export default useStore
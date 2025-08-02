import useStore from "@/store/store"
import { EditedTask, TaskPayload, UserPayload } from "@/types"
import { Task } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"

export const useMutateTask = () => {

    const queryClient = useQueryClient()
    const router = useRouter()
    const reset = useStore((state) => state.resetEditedTask)

    const createTaskMutation = useMutation(
        async (task: TaskPayload) => {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/todo`,
                task
            )
            return res.data
        },
        {
            onSuccess: (res) => {
                const previousTodos = queryClient.getQueryData<Task[]>(['tasks'])
                if (previousTodos) {
                    queryClient.setQueryData(['tasks'], [res, ...previousTodos])
                }
                reset()
            },
            onError: (err: AxiosError) => {
                reset()
                if (err.response?.status === 401 || err.response?.status === 403) {
                    router.push('/auth')
                }
            }
        }
    )

    const updateTaskMutation = useMutation(
        async (task: EditedTask) => {
            const res = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/todo/${task.id}`,
                task
            )
            return res.data
        },
        {
            onSuccess: (res, variables) => {
                const previousTodos = queryClient.getQueryData<Task[]>(['tasks'])
                if (previousTodos) {
                    queryClient.setQueryData(
                        ['tasks'], previousTodos.map((task) => (task.id === res.id ? res : task))
                    )
                }
                reset()
            },
            onError: (err: AxiosError) => {
                reset()
                if (err.response?.status === 401 || err.response?.status === 403) {
                    router.push('/auth')
                }
            }
        }
    )

    const deleteTaskMutation = useMutation(
        async (id: number) => {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/todo/${id}`
            )
        },
        {
            // variables: 削除したタスクのID
            onSuccess: (_, variables) => {
                const previousTodos = queryClient.getQueryData<Task[]>(['tasks'])
                if (previousTodos) {
                    queryClient.setQueryData(
                        ['tasks'], previousTodos.filter((task) => (task.id !== variables))
                    )
                }
                reset()
            },
            onError: (err: AxiosError) => {
                reset()
                if (err.response?.status === 401 || err.response?.status === 403) {
                    router.push('/auth')
                }
            }
        }
    )

    return { createTaskMutation, updateTaskMutation, deleteTaskMutation }
}

import { useMutateTask } from "@/hooks/useMutateTask"
import useStore from "@/store/store"
import { EditedTask } from "@/types"
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid"
import { List } from "@mantine/core"
import { FC } from "react"

export const TaskItem: FC<EditedTask> = ({
    id,
    title,
    description
}) => {
    const update = useStore((state) => state.updateEditedTask)
    const { deleteTaskMutation } = useMutateTask()

    return (
        <List.Item>
            <div className="flex items-center">
                <div className="flex mr-10">
                    <PencilIcon
                        aria-label="タスクを編集"
                        className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
                        onClick={() => {
                            update({
                                id,
                                title,
                                description
                            })
                        }}
                    />
                    <TrashIcon
                        aria-label="タスクを削除"
                        className="h-5 w-5 cursor-pointer text-blue-500"
                        onClick={() => {
                            if (window.confirm("タスクを削除しますか？"))
                                deleteTaskMutation.mutate(id)
                        }}
                    />
                </div>
                <span>{title}</span>
            </div>
        </List.Item>
    )
}

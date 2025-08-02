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
            <div className="flex float-left mr-10">
                <PencilIcon
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
                    className="h-5 w-5 cursor-pointer text-blue-500"
                    onClick={() => {
                        deleteTaskMutation.mutate(id)
                    }}
                />
            </div>
            <span>{title}</span>
        </List.Item>
    )
}

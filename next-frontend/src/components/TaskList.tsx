import { useQueryTasks } from "@/hooks/useQueryTasks"
import { List, Loader, ThemeIcon } from "@mantine/core"
import { IconCircleDashed } from "@tabler/icons-react"
import { TaskItem } from "./TaskItem"

export const TaskList = () => {
    const { data: tasks, isLoading, isError } = useQueryTasks()
    if (isLoading) return <Loader my="lg" color="cyan" />
    if (isError) return <p>タスクの取得に失敗しました</p>
    return (
        <List
            my="lg"
            spacing="sm"
            size="sm"
            icon={
                <ThemeIcon color="cyan" size={24} radius="xl">
                    <IconCircleDashed size={16} />
                </ThemeIcon>
            }
        >
            {tasks?.map((task) => (
                <TaskItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                />
            ))}

        </List>
    )
}

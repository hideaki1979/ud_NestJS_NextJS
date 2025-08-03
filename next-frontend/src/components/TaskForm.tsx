import { useMutateTask } from "@/hooks/useMutateTask"
import useStore from "@/store/store"
import { Button, Center, TextInput } from "@mantine/core"
import React, { FormEvent } from "react"
import { IconDatabase } from '@tabler/icons-react'
import { sanitizeInput, validateInput } from "@/utils/sanitize"

export const TaskForm = () => {
    const { editedTask } = useStore()
    const update = useStore((state) => state.updateEditedTask)
    const { createTaskMutation, updateTaskMutation } = useMutateTask()

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value
        const validateValue = validateInput(rawValue, 100)
        const sanitizeValue = sanitizeInput(validateValue)
        update({...editedTask, title: sanitizeValue})

    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value
        const validatedValue = validateInput(rawValue, 500)
        const sanitizedValue = sanitizeInput(validatedValue)
        update({ ...editedTask, description: sanitizedValue })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (createTaskMutation.isPending || updateTaskMutation.isPending) return
        if (editedTask.id === 0) {
            createTaskMutation.mutate({
                title: editedTask.title,
                description: editedTask.description
            })
        } else {
            updateTaskMutation.mutate({
                id: editedTask.id,
                title: editedTask.title,
                description: editedTask.description
            })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextInput
                    mt="md"
                    placeholder="title"
                    maxLength={100}
                    required
                    value={editedTask.title || ''}
                    onChange={handleTitleChange}
                />
                <TextInput
                    mt="md"
                    placeholder="description"
                    maxLength={500}
                    value={editedTask.description || ''}
                    onChange={handleDescriptionChange}
                />
                <Center mt="lg">
                    <Button
                        disabled={editedTask.title === '' || createTaskMutation.isPending || updateTaskMutation.isPending}
                        loading={createTaskMutation.isPending || updateTaskMutation.isPending}
                        color="cyan"
                        type="submit"
                        leftSection={<IconDatabase width={32} height={32} />}
                    >
                        {editedTask.id === 0 ? 'Create' : 'Update'}
                    </Button>
                </Center>
            </form>
        </>
    )
}
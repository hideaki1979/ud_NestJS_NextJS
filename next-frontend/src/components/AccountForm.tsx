'use client'

import React from 'react';
import type { AuthForm as AuthFormType } from '@/types';
import { useForm } from '@mantine/form';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ExclamationCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import { Alert, Anchor, Button, Group, PasswordInput, TextInput } from '@mantine/core';

const AccountForm = () => {
    const router = useRouter()
    const [isRegister, setIsRegister] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<AuthFormType>({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value) => {
                if (!value) return 'メールアドレスは必須です';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'メールアドレス形式で入力してください';
                return null;
            },
            password: (value) => {
                if (!value) return 'パスワードは必須です';
                if (value.length < 8) return 'パスワードは8文字以上入力してください';
                return null;
            }
        }
    })

    const handleSubmit = async () => {
        setIsLoading(true)
        setError('')
        const payload = {
            email: form.values.email,
            password: form.values.password
        }
        try {
            if (isRegister) {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, payload)
            }
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, payload)
            form.reset()
            router.push('/dashboard')
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || 'エラーが発生しました');
            } else {
                setError('予期しないエラーが発生しました');
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div className="flex justify-center mb-6">
                <ShieldCheckIcon className='h-16 w-16 text-blue-500' />
            </div>
            {error && (
                <Alert
                    my="md"
                    variant='filled'
                    icon={<ExclamationCircleIcon />}
                    title="Authorization Error"
                    color='red'
                    radius="md"
                >
                    {error}
                </Alert>
            )}

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    mt="md"
                    id='email'
                    label="Email*"
                    placeholder='example@mail.com'
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    mt="md"
                    id='password'
                    placeholder='password'
                    label="Password*"
                    description="Must be min 8 char"
                    {...form.getInputProps('password')}
                />
                <Group mt="xl">
                    <Anchor
                        component='button'
                        type='button'
                        size='xs'
                        className='text-gray-300'
                        onClick={() => {
                            setIsRegister(!isRegister)
                            setError('')
                        }}
                    >
                        {isRegister
                            ? 'Have an Account? login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button
                        color='cyan'
                        type='submit'
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        {isRegister ? 'Register' : 'Login'}
                    </Button>
                </Group>
            </form>
        </div>
    )
}

export default AccountForm
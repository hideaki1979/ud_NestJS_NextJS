'use client'

import { useEffect } from "react";
import axios from "axios";

interface CsrfProviderProps {
    children: React.ReactNode;
}

export function CsrfProvider({ children }: CsrfProviderProps) {
    useEffect(() => {
        try {            
            const getCsrfToken = async () => {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
                )
                axios.defaults.headers.common['csrf-token'] = data.csrfToken;
            }
            getCsrfToken();
        } catch (error) {
            console.error('CSRF token fetch failed:', error);
        }
    }, []);

    return <>{children}</>
}
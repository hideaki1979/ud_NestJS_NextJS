'use client'

import { useEffect } from "react";
import axios from "axios";

interface CsrfProviderProps {
    children: React.ReactNode;
}

export function CsrfProvider({ children }: CsrfProviderProps) {
    axios.defaults.withCredentials = true;  // front⇔backでCookieのやり取りする場合に必要

    useEffect(() => {
        const getCsrfToken = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
                )
                axios.defaults.headers.common['csrf-token'] = data.csrfToken;
            } catch (error) {
                console.error('CSRF token fetch failed:', error);
            }
        }
        getCsrfToken();
    }, []);

    return <>{children}</>
}
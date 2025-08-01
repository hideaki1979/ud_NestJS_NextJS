'use client'

import axios from "axios";
import { useEffect } from "react";

interface CsrfProviderProps {
    children: React.ReactNode;
}

export function CsrfProvider({ children }: CsrfProviderProps) {
    axios.defaults.withCredentials = true;  // front⇔backでCookieのやり取りする場合に必要

    useEffect(() => {
        const getCsrfToken = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf-token`
                )
                axios.defaults.headers.common['x-csrf-token'] = data.csrfToken;
            } catch (error) {
                console.error('CSRF token fetch failed:', error);
            }
        }
        getCsrfToken();
    }, []);

    return <>{children}</>
}
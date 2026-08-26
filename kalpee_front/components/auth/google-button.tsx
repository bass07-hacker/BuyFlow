'use client'

import Script from 'next/script'
import { useCallback, useRef } from 'react'
import { loginWithGoogle, extractErrorMessage } from '@/lib/auth'

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void
        }
      }
    }
  }
}

export function GoogleButton({
  onSuccess,
  onError,
}: {
  onSuccess: (role: 'USER' | 'ADMIN') => void
  onError: (message: string) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleCredential = useCallback(
    async (response: { credential: string }) => {
      try {
        const user = await loginWithGoogle(response.credential)
        onSuccess(user.role)
      } catch (err) {
        onError(extractErrorMessage(err))
      }
    },
    [onSuccess, onError],
  )

  const initialize = useCallback(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    if (!clientId || !window.google || !containerRef.current) return
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredential,
    })
    window.google.accounts.id.renderButton(containerRef.current, {
      theme: 'outline',
      size: 'large',
      width: 320,
      text: 'continue_with',
      shape: 'pill',
    })
  }, [handleCredential])

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={initialize} />
      <div ref={containerRef} className="flex w-full justify-center" />
    </>
  )
}

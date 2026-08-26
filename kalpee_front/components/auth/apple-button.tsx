'use client'

import Script from 'next/script'
import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { loginWithApple, extractErrorMessage } from '@/lib/auth'

declare global {
  interface Window {
    AppleID?: {
      auth: {
        init: (config: Record<string, unknown>) => void
        signIn: () => Promise<{
          authorization: { id_token: string }
          user?: { name?: { firstName?: string; lastName?: string } }
        }>
      }
    }
  }
}

export function AppleButton({
  onSuccess,
  onError,
}: {
  onSuccess: (role: 'USER' | 'ADMIN') => void
  onError: (message: string) => void
}) {
  const [ready, setReady] = useState(false)

  const initialize = useCallback(() => {
    const clientId = process.env.NEXT_PUBLIC_APPLE_CLIENT_ID
    const redirectUri = process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI
    if (!clientId || !window.AppleID) return
    window.AppleID.auth.init({
      clientId,
      scope: 'name email',
      redirectURI: redirectUri,
      usePopup: true,
    })
    setReady(true)
  }, [])

  const handleClick = useCallback(async () => {
    if (!window.AppleID) return
    try {
      const result = await window.AppleID.auth.signIn()
      const identityToken = result.authorization.id_token
      const prenom = result.user?.name?.firstName
      const nom = result.user?.name?.lastName
      const user = await loginWithApple(identityToken, prenom, nom)
      onSuccess(user.role)
    } catch (err) {
      onError(extractErrorMessage(err))
    }
  }, [onSuccess, onError])

  return (
    <>
      <Script
        src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        strategy="afterInteractive"
        onLoad={initialize}
      />
      <Button
        type="button"
        variant="outline"
        className="h-12 w-full rounded-full border-transparent bg-muted text-foreground hover:bg-secondary"
        onClick={handleClick}
        disabled={!ready}
      >
        <AppleLogo /> Continuer avec Apple
      </Button>
    </>
  )
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.415 2.052-1.245 2.752-.83.7-1.79 1.02-2.877.945-.03-1.05.36-2.03 1.17-2.75.81-.72 1.79-1.13 2.952-1.15zm3.36 16.36c-.3.71-.65 1.36-1.05 1.96-.55.83-1 1.4-1.35 1.72-.55.55-1.14.83-1.77.85-.44.02-.98-.13-1.62-.44-.65-.31-1.24-.46-1.79-.46-.57 0-1.18.15-1.83.46-.66.31-1.19.47-1.6.49-.6.02-1.2-.27-1.79-.87-.38-.35-.85-.94-1.42-1.79-.6-.9-1.1-1.94-1.5-3.13-.42-1.29-.63-2.53-.63-3.73 0-1.38.3-2.57.9-3.57.47-.8 1.1-1.44 1.9-1.9.79-.46 1.65-.7 2.57-.72.46 0 1.09.16 1.9.46.8.31 1.32.47 1.55.47.17 0 .74-.19 1.7-.55.9-.34 1.66-.48 2.28-.42 1.68.14 2.94.8 3.79 2 -1.5.91-2.25 2.18-2.24 3.81.01 1.27.46 2.32 1.35 3.16.4.38.85.68 1.35.9-.11.32-.23.62-.36.9z" />
    </svg>
  )
}

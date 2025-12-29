'use client'

import { createClient } from '@/lib/client'
import { Button } from '@/app/components/ui/button'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return <Button variant="secondary" onClick={logout}>Logout</Button>;
}

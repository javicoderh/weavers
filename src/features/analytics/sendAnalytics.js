const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export async function sendAnalytics(resource, data) {
  if (!supabaseUrl || !publishableKey) return

  try {
    await fetch(new URL(`/rest/v1/${resource}`, supabaseUrl), {
      method: 'POST',
      headers: {
        apikey: publishableKey,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      keepalive: true,
      body: JSON.stringify(data),
    })
  } catch {
    // Analytics must not interrupt navigation.
  }
}

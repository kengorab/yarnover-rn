import { oauthManager } from './auth'
import type { CurrentUser } from './RavelryTypes'

const apiRoot = 'https://api.ravelry.com'

export async function getCurrentUser(): Promise<CurrentUser> {
  const { user } = await oauthManager.makeAuthenticatedRequest({
    method: 'GET',
    url: `${apiRoot}/current_user.json`
  })
  return user
}

export const API_ENDPOINT = process.env.GRAPHCMS_API_ENDPOINT || ''

export const API_AUTH = {
  headers: { Authorization: `Bearer ${process.env.GRAPHCMS_API_KEY || ''}` }
}
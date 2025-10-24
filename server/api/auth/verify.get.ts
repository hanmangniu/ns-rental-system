import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, 'auth-token') || getHeader(event, 'authorization')?.replace('Bearer ', '')
    
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: '未提供认证令牌'
      })
    }

    const config = useRuntimeConfig()
    const decoded = jwt.verify(token, config.jwtSecret) as any

    return {
      success: true,
      data: {
        userId: decoded.userId,
        username: decoded.username
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: 401,
      statusMessage: '无效的认证令牌'
    })
  }
})

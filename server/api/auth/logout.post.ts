export default defineEventHandler(async (event) => {
  // 清除cookie
  setCookie(event, 'auth-token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 0
  })

  return {
    success: true,
    message: '登出成功'
  }
})

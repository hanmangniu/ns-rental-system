import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// 模拟用户数据库
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    name: '管理员',
    email: 'admin@example.com'
  },
  {
    id: 2,
    username: 'user',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    name: '普通用户',
    email: 'user@example.com'
  }
]

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { username, password } = body

    if (!username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: '用户名和密码不能为空'
      })
    }

    // 查找用户
    const user = users.find(u => u.username === username)
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: '用户名或密码错误'
      })
    }

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: '用户名或密码错误'
      })
    }

    // 生成JWT token
    const config = useRuntimeConfig()
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.username 
      },
      config.jwtSecret,
      { expiresIn: '24h' }
    )

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user

    return {
      success: true,
      data: {
        token,
        user: userWithoutPassword
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '服务器内部错误'
    })
  }
})

'use server'
import 'server-only'
import db from '@/lib/db'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const secretKey = 'STORE_KEY'

export const loginAction = async (email: string, password: string) => {
  try {
    // 只通过邮箱查询用户
    const res = await db`SELECT * FROM users WHERE email = ${email}`

    if (res.length === 0) {
      return { status: 401, message: 'login failed' }
    }

    // 使用 bcrypt.compare 比较密码
    const isMatch = await bcrypt.compare(password, res[0].password)

    if (!isMatch) {
      return { status: 401, message: 'login failed' }
    }

    const Cookie = await cookies()

    const token = await jwt.sign(
      {
        id: res[0].id,
        email: res[0].email,
        name: res[0].name,
      },
      secretKey,
      { expiresIn: '1h' }
    ) // 设置token过期时间1h

    Cookie.set({
      name: 'token',
      value: token,
      httpOnly: true,
      maxAge: 60 * 60, // 1小时
      path: '/',
    })

    return { status: 200, message: 'login success' }
  } catch (error) {
    console.error('Login error:', error)
    return { status: 500, message: 'server error' }
  }
}

export const registerAction = async (
  email: string,
  name: string,
  password: string
) => {
  const hasEmail = await db`SELECT * FROM users WHERE email = ${email}`
  if (hasEmail.length > 0) {
    return {
      status: 401,
      message: 'email already exists',
    }
  }

  const hashPwd = await bcrypt.hash(password, 10) //自动生成盐和哈希

  await db`INSERT INTO users (email, name, password) VALUES (${email}, ${name}, ${hashPwd})`

  return {
    status: 200,
    message: 'register success',
  }
}

type UserInfoType = {
  id: number
  email: string
  name: string
  iat: number
  exp: number
}

export const isAuthLogin = async () => {
  const Cookie = await cookies()

  const token = Cookie.get('token')?.value

  try {
    if (!token) {
      return { status: 401, message: 'unauthorized' } //未登录授权
    } else {
      const userInfo = jwt.verify(token, secretKey)
      //res返回 {
      //   id: "用户ID",
      //   email: "用户邮箱",
      //   name: "用户名",
      //   iat: 1234567890,  // issued at (签发时间，自动添加)
      //   exp: 1234571490   // expiration time (过期时间，自动添加)
      // }
      return {
        status: 200,
        message: 'authorized',
        data: userInfo as UserInfoType,
      }
    }
  } catch (err) {
    return { status: 401, message: 'unauthorized' }
  }
}

export const signOutAction = async () => {
  const Cookie = await cookies()
  Cookie.delete('token')

  return {
    status: 200,
    message: 'sign out success',
  }
}

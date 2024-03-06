import { LoginDto } from './dto/login-auth.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/create-auth.dto';
import * as argon2 from 'argon2'
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService extends PrismaClient {
  async register(createAuthDto: RegisterDto) {
    try {
      const password = await argon2.hash(createAuthDto.password)
      const user = await this.user.create({
        data: {
          name: createAuthDto.name,
          password,
          email: createAuthDto.email || null
        }
      })
      delete user.password
      return user
    } catch (e) {
      console.log('register-error: ', e)
    }
  }

  async login(createAuthDo: LoginDto) {
    const user = await this.user.findUnique({
      where: {
        email: createAuthDo.email,
      }
    })
    if (!user) throw new BadRequestException("用户不存在")

    const passwordMatch = await argon2.verify(user.password, createAuthDo.password)
    if (!passwordMatch) throw new BadRequestException("用户不存在")

    delete user.password
    return {
      message: "登录成功!",
      user
    }
  }
}

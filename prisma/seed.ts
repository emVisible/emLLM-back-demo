import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';
import { hash } from 'argon2';

const client = new PrismaClient()
async function init() {

  await client.user.create({
    data: {
      name: "root",
      password: "root",
      email: "example@qq.com"
    }
  })
};
init()
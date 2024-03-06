import { IsNotEmpty } from 'class-validator'

export class LoginDto {
  @IsNotEmpty({ message: "邮箱不能为空" })
  // @IsExist({ field: 'email', table: 'users' }, { message: '用户不存在' })
  email: string;
  @IsNotEmpty({ message: "密码不能为空" })
  password: string
}

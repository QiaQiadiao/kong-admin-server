import {
  Param,
  Body,
  Controller,
  Post,
  Request,
  Get,
  UnauthorizedException,
  ParseIntPipe,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/auth/public.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { typeFindUserPayload, typeUserInfo } from './user.type';
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}
  // 登录获取token
  @Public()
  @Post('/login')
  login(@Body() body: any) {
    const { name, password } = body;
    const user = this.userService.validateUser(name, password);
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    return this.userService.getToken(user);
  }
  // 根据用户id获取用户详细信息
  @Get(':id')
  getUserInfoById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserInfoById(id);
  }
  // 根据用户id获取用户菜单
  @Get('/getMenu/:id')
  getUserMenusByRoleId(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserMenusByRoleId(id);
  }
  // 获取当前用户信息列表
  @Post('/postUserList')
  postUserList(@Body() body: typeFindUserPayload) {
    if (
      body.offset === null ||
      body.offset === undefined ||
      body.size === null ||
      body.offset === undefined
    ) {
      throw new Error('请求失败: 请求参数必须包含offset和size');
    }
    const { offset, size } = body;
    const newData = { offset, size };
    let count = 0;
    for (const key in body) {
      if (body[key] !== '') newData[key] = body[key];
      count++;
    }
    if (count > 2) this.userService.findUserDetailInfo(newData);
    return this.userService.postUserDetailInfo(size, offset);
  }
  // 删除一个用户
  @Delete('/deleteOneUser/:id')
  deleteOneUser(@Param('id', ParseIntPipe) id: number) {
    this.userService.deleteOneUser(id);
  }
  // 新建一个用户
  @Post('/createOneUser')
  createOneUser(@Body() body: typeUserInfo) {
    this.userService.createOneUser(body);
  }
}

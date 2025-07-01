import {
  Param,
  Body,
  Controller,
  Post,
  Get,
  UnauthorizedException,
  ParseIntPipe,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/auth/public.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { IuserDetail, typeFindUserPayload, typeUserInfo } from './user.type';
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
  @Post('/list')
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
    return this.userService.postUserDetailInfo(size, offset);
  }
  // 更新当前展现用户列表
  @Post('/update')
  updateUserList(@Body() body: typeFindUserPayload) {
    this.userService.findUserDetailInfo(body);
  }
  // 删除一个用户
  @Delete('/delete/:id')
  deleteOneUser(@Param('id', ParseIntPipe) id: number) {
    this.userService.deleteOneUser(id);
  }
  // 新建一个用户
  @Post('/create')
  createOneUser(@Body() body: typeUserInfo) {
    this.userService.createOneUser(body);
  }
  // 更改一个用户
  @Patch('/edit')
  editOneUser(@Body() editInfo: IuserDetail) {
    this.userService.editOneUser(editInfo);
  }
}

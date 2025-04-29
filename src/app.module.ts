import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [UserModule, AuthModule, DepartmentModule, RoleModule],
})
export class AppModule {}

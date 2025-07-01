import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { AnalysisModule } from './analysis/analysis.module';

@Module({
  imports: [UserModule, AuthModule, DepartmentModule, RoleModule, MenuModule, AnalysisModule],
})
export class AppModule {}

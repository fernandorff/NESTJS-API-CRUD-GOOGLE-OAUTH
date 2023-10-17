import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { EmployeeRoleService } from "../service/employee-role.service";

@Controller('employee-role')
@ApiTags('Employee-role')
@UseGuards(AuthGuard('jwt'))
export class EmployeeRoleController {

    constructor(private readonly employeeRoleService: EmployeeRoleService) {}

    
}
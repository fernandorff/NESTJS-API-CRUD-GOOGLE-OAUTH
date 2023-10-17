import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { EmployeeSectorService } from "../service/employee-sector.service";

@Controller('employee-sector')
@ApiTags('Employee-sector')
@UseGuards(AuthGuard('jwt'))
export class EmployeeSectorController {

    constructor(private readonly employeeSectorService: EmployeeSectorService) {}

    
    
}
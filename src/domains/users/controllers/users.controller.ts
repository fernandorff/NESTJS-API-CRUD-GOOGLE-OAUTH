import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Serialize } from '../../../common/interceptors/serialize.interceptor';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('Users')
// @Serialize(UserDto)
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Return users by id.' })
  async findById(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('users not found');
    }
    return user;
  }

  @Get()
  @ApiOperation({ summary: 'Returns all registered users.' })
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete users by id.' })
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update users by id.' })
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

}
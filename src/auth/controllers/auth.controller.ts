import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards, Ip
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/sign-in')
  @ApiOperation({ summary: 'Sign in with registered users.' })
  @UseGuards(AuthGuard('google'))
  async signIn() { }

  @Get('/ip')
  @ApiOperation({ summary: 'Sign in with registered users.' })
  async ip(@Ip() ip) {
    return ip
  }

  @Get('/req')
  @ApiOperation({ summary: 'Sign in with registered users.' })
  async req(@Req() req) {
    const { headers, ip, method, url } = req;
    const extractedInfo = { headers, ip, method, url };
    console.log(extractedInfo)
    return extractedInfo;
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async handleRedirect(@Req() req, @Res() res) {   
    const {token} = await this.authService.login(req.user);
    console.log(token);

      return res.redirect(
        `http://localhost:3001/auth/hub/auth?token=${token}`,
      );
    }

  // @Post('/sign-out')
  // @ApiOperation({ summary: 'Signs out from session.' })
  // signOut(@Session() session: any) {
  //   session.userId = null;
  // }
}

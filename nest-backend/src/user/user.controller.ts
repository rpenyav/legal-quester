// user.controller.ts
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './model/user.schema';

import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ChangePasswordDto } from './change-password.dto';
import { JwtAuthGuard } from 'src/jwt-guard';
import { Types } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get('defaultValue')
  defaultValue() {
    return 'Este es el valor predeterminado.';
  }

  @Post('register')
  async create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.userService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    return { access_token: this.userService.generateToken(user) };
  }

  @Post('renew')
  async renewToken(@Body() renewDto: { email: string }) {
    // Asumimos que ya has validado al usuario de alguna forma
    const user = await this.userService.findOneByEmail(renewDto.email);
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return { access_token: this.userService.generateToken(user) };
  }

  @Get('all')
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOneById(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('slug/:slug')
  async findOneBySlug(@Param('slug') slug: string) {
    return this.userService.findOneSlug(slug);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() image): Promise<any> {
    // Verificación del archivo
    if (!image || !image.buffer) {
      throw new BadRequestException('No se proporcionó un archivo válido.');
    }

    const result = await this.cloudinaryService.uploadImage(image.buffer);
    return { imageUrl: result.url };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Put('change-password/:id')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    try {
      return this.userService.changePassword(
        id,
        changePasswordDto.currentPassword,
        changePasswordDto.newPassword,
      );
    } catch (error) {
      if (error.message === 'La contraseña actual es incorrecta.') {
        throw new HttpException(
          'La contraseña actual es incorrecta.',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }

  @Delete(':userId/unblock/:enemyId')
  async unblockEnemy(
    @Param('userId') userId: Types.ObjectId,
    @Param('enemyId') enemyId: Types.ObjectId,
  ): Promise<User> {
    console.log('unblockEnemy - userId:', userId, 'enemyId:', enemyId);
    const result = await this.userService.unblockEnemy(userId, enemyId);
    console.log('unblockEnemy - result:', result);
    return result;
  }

  @Patch(':id')
  async patchUser(@Param('id') id: string, @Body() updateData: any) {
    return this.userService.patchUser(id, updateData);
  }
}

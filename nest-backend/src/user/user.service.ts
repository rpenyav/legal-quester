// user.service.ts
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as jsrsasign from 'jsrsasign';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserSchema, UserDocument } from './model/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async create(user: User): Promise<User> {
    // Comprueba si el email ya existe en la base de datos
    const existingUser = await this.userModel.findOne({ email: user.email });

    if (existingUser) {
      throw new ConflictException('El usuario ya existe'); // Lanza una excepción si el usuario ya existe
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  generateToken(user: any): string {
    const payload = {
      _id: user._id,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    return user;
  }

  async unblockEnemy(
    userId: Types.ObjectId,
    enemyId: Types.ObjectId,
  ): Promise<User> {
    console.log('Service unblockEnemy - userId:', userId, 'enemyId:', enemyId);

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.peopleBlocked = user.peopleBlocked.filter(
      (enemy) => !enemy.idEnemy.equals(enemyId),
    );
    return user.save();
  }

  async findOneSlug(slug: string): Promise<User> {
    const user = await this.userModel.findOne({ slug });
    return user;
  }

  async update(id: string, user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id);
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<any> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado.');
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('La contraseña actual es incorrecta.');
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return { message: 'Contraseña actualizada con éxito' };
  }

  async patchUser(id: string, updateData: any): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    // Si se está actualizando la contraseña, necesitas hashearla antes de guardarla
    if (updateData.password) {
      const salt = await bcrypt.genSalt();
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    // Realizamos la actualización parcial
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true },
    );

    if (!updatedUser) {
      throw new NotFoundException('Error al actualizar el usuario.');
    }

    return updatedUser;
  }
}

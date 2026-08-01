import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Organization } from './entities/organization.entity';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Organization)
    private orgRepository: Repository<Organization>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, displayName: string, orgName: string) {
    let org = await this.orgRepository.findOne({ where: { name: orgName } });
    if (!org) {
      org = this.orgRepository.create({ name: orgName, description: `Organization: ${orgName}` });
      org = await this.orgRepository.save(org);
    }

    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      passwordHash,
      displayName,
      organizationId: org.id,
    });
    await this.userRepository.save(user);

    const token = this.jwtService.sign({ sub: user.id, email: user.email, orgId: org.id });
    return { token, user: { id: user.id, email: user.email, displayName: user.displayName, organizationId: org.id } };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ sub: user.id, email: user.email, orgId: user.organizationId });
    return { token, user: { id: user.id, email: user.email, displayName: user.displayName, organizationId: user.organizationId, isDarkMode: user.isDarkMode } };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');
    const { passwordHash, ...profile } = user;
    return profile;
  }

  async updateProfile(userId: string, data: Partial<User>) {
    await this.userRepository.update(userId, data);
    return this.getProfile(userId);
  }
}

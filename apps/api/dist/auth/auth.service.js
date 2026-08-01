"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const organization_entity_1 = require("./entities/organization.entity");
const user_entity_1 = require("./entities/user.entity");
let AuthService = class AuthService {
    constructor(orgRepository, userRepository, jwtService) {
        this.orgRepository = orgRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(email, password, displayName, orgName) {
        let org = await this.orgRepository.findOne({ where: { name: orgName } });
        if (!org) {
            org = this.orgRepository.create({ name: orgName, description: `Organization: ${orgName}` });
            org = await this.orgRepository.save(org);
        }
        const existing = await this.userRepository.findOne({ where: { email } });
        if (existing)
            throw new common_1.ConflictException('Email already registered');
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
    async login(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const token = this.jwtService.sign({ sub: user.id, email: user.email, orgId: user.organizationId });
        return { token, user: { id: user.id, email: user.email, displayName: user.displayName, organizationId: user.organizationId, isDarkMode: user.isDarkMode } };
    }
    async getProfile(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const { passwordHash, ...profile } = user;
        return profile;
    }
    async updateProfile(userId, data) {
        await this.userRepository.update(userId, data);
        return this.getProfile(userId);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organization_entity_1.Organization)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
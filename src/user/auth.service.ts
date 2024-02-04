import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "./user.service";
import { randomBytes, scrypt as _scrypt} from "crypto";
import { promisify } from "util";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

    constructor( 
        private userService: UserService,
        private jwtService: JwtService
        ){}

    async signUp(email: string, password: string){

        const users = await this.userService.findEmail(email);

        if(users){
            throw new BadRequestException('email is already in use');
        }
        const salt = randomBytes(8).toString('hex');
        const hash = await scrypt(password, salt, 32) as Buffer;
        const result = salt + '.' + hash.toString('hex');
        return this.userService.create(email, result);
    }

    async signIn(email: string, password: string): Promise<{ access_token: string, email: string, user_id: number }>{

        const user = await this.userService.findEmail(email);
        console.log(user);
        if (!user){
            throw new NotFoundException('user not found!');
        }
        const [salt, storeHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if(storeHash !== hash.toString('hex')){
            throw new BadRequestException('incorrect user password')
        }
        const payload = {sub: user.id, email: user.email}
        return {
            user_id: user.id,
            email: user.email,
            access_token: await this.jwtService.signAsync(payload)
        };
        
    }

}

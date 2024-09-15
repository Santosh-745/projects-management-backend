import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities";
import { Repository } from "typeorm";
import { SignupDto } from "../../auth/dtos";

export class UserRepository extends Repository<User> {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
    ) {
        super(
            userRepository.target,
            userRepository.manager,
            userRepository.queryRunner,
        );
    }

    async findByEmail(email: string) {
        return this.userRepository.findOneBy({ email });
    }

    async get(id: number) {
        return this.userRepository.findOneBy({ id });
    }

    async store(body: SignupDto) {
        const newUser = this.userRepository.create(body);
        return this.userRepository.save(newUser);
    }
}
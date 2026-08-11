import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {

    constructor(
        private readonly configService: ConfigService
    ) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {

        return {
            type: 'postgres',
            host: this.configService.get<string>('POSTGRES_HOST'),
            port: this.configService.get<number>('POSTGRES_PORT'),
            username: this.configService.get<string>('POSTGRES_USER'),
            password: this.configService.get<string>('POSTGRES_PASSWORD'),
            database: this.configService.get<string>('POSTGRES_DB'),
            autoLoadEntities: true,
            // Alterações de schema devem ser feitas por migrations. `synchronize`
            // pode apagar colunas existentes e não deve ser usado com dados reais.
            synchronize: this.configService.get<string>('DB_SYNCHRONIZE') === 'true',
            ssl: this.configService.get<string>('POSTGRES_SSL') === 'true' ? { rejectUnauthorized: false }: false,
        };
        
    }
}

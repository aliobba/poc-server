import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EnvService {
    private readonly env = process.env;
    private readonly logger = new Logger(EnvService.name);

    private getValue(key: string, required = true): string {
        const value = this.env[key];
        if (required && (value === undefined || value === '')) {
            throw new Error(`Configuration error: Missing environment variable ${key}`);
        }
        return value || '';
    }

    getString(key: string, required = true): string {
        return this.getValue(key, required);
    }

    getNumber(key: string, required = true): number {
        const value = this.getValue(key, required);
        const num = Number(value);
        if (isNaN(num)) {
            throw new Error(`Configuration error: Environment variable ${key} is not a valid number`);
        }
        return num;
    }

    getBoolean(key: string, required = true): boolean {
        const value = this.env[key];

        // Si la variable est optionnelle et n'existe pas, retourne false par défaut
        if (!value) {
            if (required) {
                throw new Error(`Configuration error: Missing environment variable ${key}`);
            }
            return false;
        }

        const val = value.toLowerCase();
        if (['true', '1', 'yes', 'y'].includes(val)) return true;
        if (['false', '0', 'no', 'n'].includes(val)) return false;

        throw new Error(`Configuration error: Environment variable ${key} is not a valid boolean`);
    }

    // Exemple d'accès direct : envService.mailHost
    get mailHost(): string {
        return this.getString('MAIL_HOST');
    }

    get mailPort(): number {
        return this.getNumber('MAIL_PORT');
    }

    get mailSecure(): boolean {
        return this.getBoolean('MAIL_SECURE');
    }

    get mailUser(): string {
        return this.getString('MAIL_USER');
    }

    get mailPass(): string {
        return this.getString('MAIL_PASS');
    }

    get mailFrom(): string {
        return this.getString('MAIL_FROM');
    }

    get mailLogger(): boolean {
        return this.getBoolean('MAIL_LOGGER', false);
    }

    get mailDebug(): boolean {
        return this.getBoolean('MAIL_DEBUG', false);
    }

    userAuthEmail(index?: string): string {
        return this.getString(index ? `AUTH_EMAIL_${index}` : 'AUTH_EMAIL');
    }

    get userAuthPass(): string {
        return this.getString('AUTH_PASSWORD');
    }
}

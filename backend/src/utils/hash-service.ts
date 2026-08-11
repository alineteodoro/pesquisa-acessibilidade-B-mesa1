import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class HashService {
    public hashar(texto: string): string {
        return crypto.createHash('sha256').update(texto).digest('hex');
    }
}

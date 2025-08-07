import { Injectable, Logger } from '@nestjs/common';
import { POS } from './entities/pos.entity';
// import { v4 as uuid } from 'uuid';

@Injectable()
export class PosService {
  private readonly posStore = new Map<string, POS>();

  constructor() {
    this.seedMockPos();
  }

  private seedMockPos() {
    // company 1
    const pos1: POS = { companyId: "1", id: "d02b9248-955e-46df-ae6c-788c53f6790e", name: 'Supermarché Alpha', location: 'Centre Ville 1' };
    const pos2: POS = { companyId: "1", id: "d02b9248-955e-46df-ae6c-788c53f6790f", name: 'Supermarché Teta', location: 'Centre Ville 2' };

    // company 2
    const pos3: POS = { companyId: "2", id: "45a03bb3-a251-4197-ac03-5edb0bb55c33", name: 'Boutique Beta', location: 'Zone Industrielle 1' };
    const pos4: POS = { companyId: "2", id: "45a03bb3-a251-4197-ac03-5edb0bb55c34", name: 'Boutique Teta', location: 'Zone Industrielle 2' };

    this.posStore.set(pos1.id, pos1);
    this.posStore.set(pos2.id, pos2);
    this.posStore.set(pos3.id, pos3);
    this.posStore.set(pos4.id, pos4);
  }

  getAllPos(): POS[] {
    return Array.from(this.posStore.values());
  }

  getAllPosByCompanyId(companyId: string): POS[] {
    Logger.log(`Fetching POS for company ID: ${companyId}`);
    return Array.from(this.posStore.values()).filter(pos => { Logger.log(`Checking POS: ${pos.id}`); return pos.companyId === companyId });
  }

  getPosById(id: string): POS | undefined {
    return this.posStore.get(id);
  }
}

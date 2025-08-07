import { Injectable, Logger } from '@nestjs/common';
import { Report } from './entities/report.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ReportService {
  protected readonly logger = new Logger(ReportService.name);
  private readonly reportStore: Report[] = [];

  constructor() {
    this.seedMockReports();
  }

  private seedMockReports() {
    // company 1
    // Exemple rapport "propreté" pour POS fictif
    this.reportStore.push({
      id: uuid(),
      posId: "d02b9248-955e-46df-ae6c-788c53f6790e", // associe à ton POS
      type: 'proprete',
      createdAt: new Date(),
      fields: [
        { type: 'text', label: 'Observations', placeholder: 'Notes sur la propreté' },
        { type: 'radio', label: 'État général', options: ['Bon', 'Moyen', 'Mauvais'] },
        { type: 'checkbox', label: 'Zones nettoyées', options: ['Entrée', 'Rayons', 'Caisses'] },
        { type: 'image', label: 'Photo de la zone' },
      ],
    });

    // Exemple rapport "stock"
    this.reportStore.push({
      id: uuid(),
      posId: "d02b9248-955e-46df-ae6c-788c53f6790e",
      type: 'stock',
      createdAt: new Date(),
      fields: [
        { type: 'text', label: 'Produit manquant', placeholder: 'Nom du produit' },
        { type: 'picker', label: 'Niveau du stock', options: ['Faible', 'Moyen', 'Élevé'] },
        { type: 'image', label: 'Photo de l’étagère' },
      ],
    });

    // Exemple rapport "code vestimentaire"
    this.reportStore.push({
      id: uuid(),
      posId: "d02b9248-955e-46df-ae6c-788c53f6790e",
      type: 'code_vestimentaire',
      createdAt: new Date(),
      fields: [
        { type: 'text', label: 'Observations', placeholder: 'Notes sur le code vestimentaire' },
        { type: 'radio', label: 'Respect du code', options: ['Oui', 'Non'] },
        { type: 'image', label: 'Photo de l\'employé' },
      ],
    });

    // Exemple rapport "propreté" pour POS fictif
    this.reportStore.push({
      id: uuid(),
      posId: "d02b9248-955e-46df-ae6c-788c53f6790f", // associe à ton POS
      type: 'proprete',
      createdAt: new Date(),
      fields: [
        { type: 'text', label: 'Observations', placeholder: 'Notes sur la propreté' },
        { type: 'radio', label: 'État général', options: ['Bon', 'Moyen', 'Mauvais'] },
        { type: 'checkbox', label: 'Zones nettoyées', options: ['Entrée', 'Rayons', 'Caisses'] },
        { type: 'image', label: 'Photo de la zone' },
      ],
    });

    // Exemple rapport "stock"
    this.reportStore.push({
      id: uuid(),
      posId: "d02b9248-955e-46df-ae6c-788c53f6790f",
      type: 'stock',
      createdAt: new Date(),
      fields: [
        { type: 'text', label: 'Produit manquant', placeholder: 'Nom du produit' },
        { type: 'picker', label: 'Niveau du stock', options: ['Faible', 'Moyen', 'Élevé'] },
        { type: 'image', label: 'Photo de l’étagère' },
      ],
    });

    // Exemple rapport "code vestimentaire"
    this.reportStore.push({
      id: uuid(),
      posId: "d02b9248-955e-46df-ae6c-788c53f6790f",
      type: 'code_vestimentaire',
      createdAt: new Date(),
      fields: [
        { type: 'text', label: 'Observations', placeholder: 'Notes sur le code vestimentaire' },
        { type: 'radio', label: 'Respect du code', options: ['Oui', 'Non'] },
        { type: 'image', label: 'Photo de l’employé' },
      ],
    });


    // company 2
    // Exemple rapport "propreté" pour POS fictif
    this.reportStore.push({
      id: uuid(),
      posId: "45a03bb3-a251-4197-ac03-5edb0bb55c33", // associe à ton POS
      type: 'proprete',
      createdAt: new Date(),
      fields: [
        { type: 'text', label: 'Observations', placeholder: 'Notes sur la propreté' },
        { type: 'radio', label: 'État général', options: ['Bon', 'Moyen', 'Mauvais'] },
        { type: 'checkbox', label: 'Zones nettoyées', options: ['Entrée', 'Rayons', 'Caisses'] },
        { type: 'image', label: 'Photo de la zone' },
      ],
    });

    // Exemple rapport "stock"
    this.reportStore.push({
      id: uuid(),
      posId: "45a03bb3-a251-4197-ac03-5edb0bb55c33",
      type: 'stock',
      createdAt: new Date(),
      fields: [
        { type: 'text', label: 'Produit manquant', placeholder: 'Nom du produit' },
        { type: 'picker', label: 'Niveau du stock', options: ['Faible', 'Moyen', 'Élevé'] },
        { type: 'image', label: 'Photo de l’étagère' },
      ],
    });

    // Exemple rapport "code vestimentaire"
    this.reportStore.push({
      id: uuid(),
      posId: "45a03bb3-a251-4197-ac03-5edb0bb55c33",
      type: 'code_vestimentaire',
      createdAt: new Date(),
      fields: [
        { type: 'text', label: 'Observations', placeholder: 'Notes sur le code vestimentaire' },
        { type: 'radio', label: 'Respect du code', options: ['Oui', 'Non'] },
        { type: 'image', label: 'Photo de l’employé' },
      ],
    });

    // Exemple rapport "propreté" pour POS fictif
    this.reportStore.push({
      id: uuid(),
      posId: "45a03bb3-a251-4197-ac03-5edb0bb55c34", // associe à ton POS
      type: 'proprete',
      createdAt: new Date(),
      fields: [
        { type: 'text', label: 'Observations', placeholder: 'Notes sur la propreté' },
        { type: 'radio', label: 'État général', options: ['Bon', 'Moyen', 'Mauvais'] },
        { type: 'checkbox', label: 'Zones nettoyées', options: ['Entrée', 'Rayons', 'Caisses'] },
        { type: 'image', label: 'Photo de la zone' },
      ],
    });

    // Exemple rapport "stock"
    this.reportStore.push({
      id: uuid(),
      posId: "45a03bb3-a251-4197-ac03-5edb0bb55c34",
      type: 'stock',
      createdAt: new Date(),
      fields: [
        { type: 'text', label: 'Produit manquant', placeholder: 'Nom du produit' },
        { type: 'picker', label: 'Niveau du stock', options: ['Faible', 'Moyen', 'Élevé'] },
        { type: 'image', label: 'Photo de l’étagère' },
      ],
    });

    // Exemple rapport "code vestimentaire"
    this.reportStore.push({
      id: uuid(),
      posId: "45a03bb3-a251-4197-ac03-5edb0bb55c34",
      type: 'code_vestimentaire',
      createdAt: new Date(),
      fields: [
        { type: 'text', label: 'Observations', placeholder: 'Notes sur le code vestimentaire' },
        { type: 'radio', label: 'Respect du code', options: ['Oui', 'Non'] },
        { type: 'image', label: 'Photo de l\'employé' },
      ],
    });
  }

  getReportsByPos(posId: string): Report[] {
    this.logger.log(`Fetching reports for POS with ID: ${posId}`);
    return this.reportStore.filter(r => r.posId === posId);
  }

  getReportById(reportId: string): Report | undefined {
    return this.reportStore.find(r => r.id === reportId);
  }
}

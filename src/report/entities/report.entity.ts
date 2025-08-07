export type ReportField =
  | { type: 'text'; label: string; placeholder?: string; value?: string }
  | { type: 'radio'; label: string; options: string[]; value?: string }
  | { type: 'checkbox'; label: string; options: string[]; value?: string[] }
  | { type: 'picker'; label: string; options: string[]; value?: string }
  | { type: 'image'; label: string; value?: string }; // base64 ou URL

export class Report {
  id: string;
  posId: string; // lien avec le point de vente
  type: 'proprete' | 'code_vestimentaire' | 'stock' | 'autre';
  createdAt: Date;
  fields: ReportField[];
}
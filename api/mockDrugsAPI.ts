import data from '../mocks/db.json';
import { Drug } from '../types/drug';

const DELAY_MS = 600;

const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

// Список всех препаратов
export async function fetchDrugs(): Promise<Drug[]> {
  await delay(DELAY_MS);
  return data.drugs as Drug[];
}

// Один препарат по id (вернёт undefined, если не найден)
export async function fetchDrugById(id: string): Promise<Drug | undefined> {
  await delay(DELAY_MS);
  return (data.drugs as Drug[]).find((d) => d.id === id);
}

import { read, utils } from 'xlsx';
import { z } from 'zod';
import type { LedgerEntry } from '../types/ledger';

const rowSchema = z.object({
  date: z.string(),
  name: z.string(),
  rent: z.number(),
  'adv 1': z.number().optional(),
  'adv 2': z.number().optional(),
  'adv 3': z.number().optional(),
  'GST Bill Amt': z.number(),
  cleaning: z.number(),
  EB: z.number(),
  water: z.number(),
  gas: z.number(),
  AC: z.number(),
  'room rent': z.number(),
  generator: z.number(),
  'prev day': z.number(),
  others: z.number(),
  discount: z.number(),
  'GST Amt': z.number()
});

export async function parseExcelFile(file: File): Promise<LedgerEntry[]> {
  try {
    const buffer = await file.arrayBuffer();
    const workbook = read(buffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(worksheet);

    const entries: LedgerEntry[] = [];
    let currentEntry: Partial<LedgerEntry> | null = null;

    for (const row of jsonData) {
      try {
        const validatedRow = rowSchema.parse(row);
        
        if (validatedRow.name && validatedRow.date) {
          if (currentEntry) {
            entries.push(currentEntry as LedgerEntry);
          }

          currentEntry = {
            date: validatedRow.date,
            name: validatedRow.name,
            rent: validatedRow.rent,
            advances: [
              { amount: validatedRow['adv 1'] || 0, date: '' },
              { amount: validatedRow['adv 2'] || 0, date: '' },
              { amount: validatedRow['adv 3'] || 0, date: '' }
            ].filter(adv => adv.amount > 0),
            bills: {
              gst: validatedRow['GST Bill Amt'],
              cleaning: validatedRow.cleaning,
              electricity: validatedRow.EB,
              water: validatedRow.water,
              gas: validatedRow.gas,
              ac: validatedRow.AC,
              roomRent: validatedRow['room rent'],
              generator: validatedRow.generator,
              prevDay: validatedRow['prev day'],
              others: validatedRow.others,
              discount: validatedRow.discount,
              gstAmount: validatedRow['GST Amt']
            },
            expenses: [],
            deposits: [],
            totals: {
              billTotal: 0,
              advanceReceived: 0,
              balanceCollected: 0,
              pendingBalance: 0,
              excessShortage: 0
            }
          };
        }
      } catch (error) {
        console.warn('Invalid row:', row, error);
      }
    }

    if (currentEntry) {
      entries.push(currentEntry as LedgerEntry);
    }

    return entries;
  } catch (error) {
    console.error('Error parsing Excel file:', error);
    throw new Error('Failed to parse Excel file');
  }
}
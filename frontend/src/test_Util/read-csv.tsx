import fs from 'fs-extra';
import csvParser from 'csv-parser';

export const readCsvFile = async (filePath: string): Promise<any[]> => {
  const data: any[] = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row: any) => {
        data.push(row);
      })
      .on('end', () => {
        resolve(data);
      })
      .on('error', (error: Error) => {
        reject(error);
      });
  });
};
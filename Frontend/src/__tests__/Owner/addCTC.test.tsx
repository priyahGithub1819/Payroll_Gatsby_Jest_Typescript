import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import AddCTC from "../../pages/Owner/addCTC";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { waitFor } from "@testing-library/dom";
import { fireEvent } from "@testing-library/react";
import { render, screen } from '@testing-library/react';
import fs from 'fs';

describe("addCTC.test.tsx", () => {
  function validateCSVFile(file: File): boolean {
    console.log("Validating csv file function");

    // Check if the file type is CSV
    if (file.type !== "text/csv") {
      throw new Error("Invalid file type");
    }
    // Additional validation logic, if needed
    return true;
  }
 
  test("should validate CSV file", () => {
    render(<AddCTC />);
    // Mock the uploaded file
    const file = new File(["CSV file content"], "data.csv", {
      type: "text/csv",
    });
    console.log(file);

    // Your upload CSV file validation function
    const isValidCSVFile = validateCSVFile(file);
    expect(isValidCSVFile).toBe(true);
  });

  test('should throw error for invalid file type', () => {
    // Mock the uploaded file
    const file = new File(['Invalid file content'], 'data.txt', { type: 'text/plain' });
    const isValidCSVFile = validateCSVFile(file);
    // Your upload CSV file validation function
    // const validateCSVFile = () => {
    //   // Function that throws an error if the file type is not CSV
    //   if (file.type !== "text/csv") {
    //     throw new Error("Invalid file type");
    //   }
    // };
  
    expect(validateCSVFile.bind(null, file)).toThrowError('Invalid file type');
  });
  
  // test.skip('should process CSV file correctly', () => {
  //   // Mock the uploaded file
  //   const csvContent = 'Header1,Header2\nValue1,Value2';
  //   const file = new File([csvContent], 'data.csv', { type: 'text/csv' });
  
  //   // Your CSV processing function
  //   const processCSVFile = (file: File): Promise<any[]> => {
  //     return new Promise((resolve, reject) => {
  //       const results: any[] = [];
    
  //       fs.createReadStream(file.path)
  //         .pipe(csv())
  //         .on('data', (data) => results.push(data))
  //         .on('end', () => resolve(results))
  //         .on('error', (error) => reject(error));
  //     });
  //   };
   
  //   // Mock the expected processed data
  //   const expectedData = [
  //     { Header1: 'Value1', Header2: 'Value2' }
  //   ];
  
  //   expect(processCSVFile(file)).toEqual(expectedData);
  // });
});

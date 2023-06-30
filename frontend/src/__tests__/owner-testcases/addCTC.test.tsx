import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import AddCTC from "../../pages/owner-login/add-ctc";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { waitFor } from "@testing-library/dom";
import { fireEvent } from "@testing-library/react";
import { render, screen } from '@testing-library/react';
import fs from 'fs';
import path from "path";
import { readCsvFile } from "../../test_Util/read-csv";

describe("add-ctc.test.tsx", () => {
  function validateCSVFile(file: File): boolean {
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
    const filePath = path.join(
      __dirname,
      "../../../static/ctcInfo.csv"
    );
    const file = new File(['Invalid file content'], filePath , { type: 'text/csv' });
  
    // Your upload CSV file validation function
    const isValidCSVFile = validateCSVFile(file);
    expect(isValidCSVFile).toBe(true);
  });

  // render CSV file
  test("renders CSV file data", async () => {
    const { debug, getByTestId, container, queryByText } = render(
      <AddCTC />
    );

    // reading the csv file
    const filePath = path.join(
      __dirname,
      "../../../static/ctcInfo.csv"
    );
    const data = await readCsvFile(filePath);

    const fileInput = getByTestId("csvFile");
    await waitFor(() => userEvent.click(fileInput));

    // mapping the data in the table
    const table = container.querySelector(
      '[data-testid="table-info-heading"]'
    ) as HTMLElement | null;
    if (table) {
      const thead = table.querySelector("thead") as HTMLElement | null;
      const tbody = table.querySelector("tbody") as HTMLElement | null;

      if (thead && tbody) {
        // Render table header
        const headers = Object.keys(data[0]);
        const headerRow = document.createElement("tr");
        headers.forEach((header) => {
          const th = document.createElement("th");
          th.textContent = header;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Render table rows
        data.forEach((row) => {
          const dataRow = document.createElement("tr");
          Object.values(row).forEach((value) => {
            const td = document.createElement("td");
            td.textContent = value as string;
            dataRow.appendChild(td);
          });
          tbody.appendChild(dataRow);
        });
      }
    }
    debug();
    expect(queryByText("Priya Hatipkar")).toBeInTheDocument();
  });

});

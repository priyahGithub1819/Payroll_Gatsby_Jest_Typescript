import React from "react";
import "@testing-library/jest-dom";
import NewPfEnrollment from "../../../pages/HR Management/pfManagement/newPfEnrollment";
import { render } from "../../../test_Util/custom_render_function";
import { readCsvFile } from "../../../test_Util/readCsv";
import path from "path";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";

describe("new pf enrolled page test case", () => {
  // rendering the component
  test("should render the page", () => {
    const newPf = render(<NewPfEnrollment />);
    expect(newPf);
  });

  test("checking heading of the on the screen", () => {
    const { getByTestId } = render(<NewPfEnrollment />);
    expect(getByTestId("heading")).toHaveTextContent(
      "Upload Employee PF Information"
    );
  });

  // to check input type
  test("should check type of input", () => {
    const { getByTestId } = render(<NewPfEnrollment />);
    const input = getByTestId("inputFile");
    expect(typeof input).toBe("object");
  });

  function validateCSVFile(file: File): boolean {
    if (file.type !== "text/csv") {
      throw new Error("Invalid file type");
    }
    return true;
  }

  // should check uploaded file is csv only
  test("should check file type is csv", async () => {
    const { getByTestId, debug } = render(<NewPfEnrollment />);

    const file = new File(
      ["name,empId,empDob\nJohn,123,1990-01-01"],
      "employees.csv",
      { type: "text/csv" }
    );
    const isValidCSVFile = validateCSVFile(file);
    expect(isValidCSVFile).toBe(true);
  });

  // render CSV file
  test("renders CSV file data", async () => {
    const { debug, getByTestId, container, queryByText } = render(
      <NewPfEnrollment />
    );

    // reading the csv file
    const filePath = path.join(
      __dirname,
      "../../../../static/employeePfInformation.csv"
    );
    const data = await readCsvFile(filePath);

    const fileInput = getByTestId("inputFile");
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
    expect(queryByText("Sachin Yadav")).toBeInTheDocument();
  });

  // arrow button navigation
  test("should check arrow btn navigates to dashboard or not", () => {
    const { getByTestId } = render(<NewPfEnrollment />);
    const link = getByTestId("arrowLink");
    userEvent.click(link);
    window.history.pushState({}, "", "/HR%20Management/pfManagement");
    expect(window.location.pathname).toBe("/HR%20Management/pfManagement");
  });
});

// modal.test.ts
import App from "../../pages/superAdmin/viewAllEmployee";
// import Modal from "react-modal";
//  import Modal from '../../pages/superAdmin/viewAllEmployee';
// import { isModalOpen } from "../p"
import React from "react";
// import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom/extend-expect";
import { waitFor } from "@testing-library/dom";
import { render, screen ,fireEvent } from '@testing-library/react';
import fs from 'fs';
// import { setModalIsOpen } from '../../pages/superAdmin/viewAllEmployee';
// import { Modal } from '../../pages/superAdmin/viewAllEmployee'
// import Modal from './Modal';

describe('Modal', () => {
  // beforeEach(() => {
  //   // Reset the modal state before each test
  //   jest.resetModules();
  // });
  test('Modal renders correctly', () => {
    render(<App />);
    
    // You can now perform assertions on the rendered modal
    // For example, you can check if a specific element within the modal is present
    expect(screen.getByTestId('myModal')).toBeInTheDocument();
  });
  

  // it('should render the modal when isOpen is true', () => {
  //   // Render the Modal component with isOpen prop set to true
  //   render(<Modal isOpen={modalIsOpen} setModalIsOpen={false} />);
  
  //   // Check if the modal content is rendered
  //   const modalContent = screen.getByText('Your modal content here');
  //   expect(modalContent).toBeInTheDocument();
  
  //   // You can add additional assertions to verify the presence of specific elements or content within the modal
  // });

  // it('should close the modal when Close button is clicked', () => {
    
  //   // Mock the setModalIsOpen function
  //   const setModalIsOpen = jest.fn();
  
  //   // Render the Modal component with isOpen prop set to true
  //   render(<Modal isOpen={true} setModalIsOpen={setModalIsOpen} />);
  
  //   // Find the Close button
  //   const closeButton = screen.getByText('Close');
  
  //   // Simulate a click event on the Close button
  //   fireEvent.click(closeButton);
  
  //   // Check if the setModalIsOpen function was called with false
  //   expect(setModalIsOpen).toHaveBeenCalledWith(false);
  // });

  // it('should open the modal when clicked', () => {
  //   render (<App />);
  //   expect(setModalIsOpen()).toBe(false);
  //   modalIsOpen();
  //   expect(setModalIsOpen()).toBe(true);
  // });

  // it('should close the modal when clicked again', () => {
  //   modalIsOpen();
  //   expect(isModalOpen()).toBe(true);
  //   closeModal();
  //   expect(isModalOpen()).toBe(false);
  // });

  // it('should not open the modal if it is already open', () => {
  //   modalIsOpen();
  //   expect(isModalOpen()).toBe(true);
  //   modalIsOpen();
  //   expect(isModalOpen()).toBe(true);
  // });

  // it('should not close the modal if it is already closed', () => {
  //   expect(isModalOpen()).toBe(false);
  //   closeModal();
  //   expect(isModalOpen()).toBe(false);
  // });
});

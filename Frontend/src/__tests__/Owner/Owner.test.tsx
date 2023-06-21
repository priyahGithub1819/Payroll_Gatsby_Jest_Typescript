import React from "react";
import Owner from "../../pages/Owner/Owner";
import { multiRender } from "../../test_Util/custom_render_function";
import "@testing-library/jest-dom"
import {screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event";



  const routes = [
      { path: '/app/owner', component: Owner },
      { path: '/owner/listOfEmp', component:()=> <h2>list of employee page</h2> },
    { path: '/Owner/confirmEmp', component:()=> <h2>list of confirm employee page</h2> },
    { path: '/Owner/empConfirm', component:()=> <h2>confirm employee page</h2> },
    { path: '/Owner/empRecordUpdate', component:()=> <h2>employee record update page</h2> },
    { path: '/Owner/candiSelection', component:()=> <h2>candidate selection page</h2> },
    { path: '/Owner/viewSelectedCandi', component:()=> <h2>view candidate selection page</h2> },
    { path: '/Owner/viewHoldCandi', component:()=> <h2>view hold candidate page</h2> },
    { path: '/Owner/viewRejectedCandi', component:()=> <h2>view rejected candidate page</h2> },
    { path: '/Owner/viewOnboardCandi', component:()=> <h2>view onboarding candidate page</h2> },
    { path: '/Owner/addCTC', component:()=> <h2>add CTC page</h2> },
    { path: '/Owner/updateCTC', component:()=> <h2>update CTC page</h2> },
    { path: '/Owner/uploadPayrollDoc', component:()=> <h2>upload payroll doc page</h2> },
    // Add more routes as needed
  ];

describe("testing Owner.tsx",()=>{
    it("checking is All Employee  is working",async ()=>{
    })

})
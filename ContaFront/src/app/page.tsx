"use client"
import Button from "@mui/material/Button";
import { PrimaryBtn, CustomInput } from "@actualizaciontecnologica/at-itg";
import React from "react";

export default function Home() {
  return (
    <div className="container">

      <Button variant="contained" color="primary"> Click Me </Button>
      <PrimaryBtn
        color="primary"
        label="text"
        size="medium"
        variant="contained"
      />

      {/* <CustomInput
        color="primary"
        input={<React.Memo />}
        label="Search"
        placeholder="Search element"
        regex=""
        setValue={() => { }}
        type="text"
        value=""
      /> */}
    </div>
  );
}

import React from "react";
import {createContext } from "react";

export const TableModeContext = createContext(
    {
        contextViewMode: true,
        setViewMode: (value: boolean) => {}
    }
);
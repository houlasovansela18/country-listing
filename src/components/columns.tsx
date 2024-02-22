"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    flags: string;
    name: string;
    cca2: string;
    cca3: string;
    nativeName: string;
    idd: string;
    altSpellings: string[];
};

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "flags",
        header: "Flag",
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === "asc");
                    }}
                >
                    Country Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        enableSorting: true,
    },
    {
        accessorKey: "cca2",
        header: "CCA2",
    },
    {
        accessorKey: "cca3",
        header: "CCA3",
    },
    {
        accessorKey: "nativeName",
        header: "Native Country Name",
    },
    {
        accessorKey: "altSpellings",
        header: "Alternative Country Name",
    },
    {
        accessorKey: "idd",
        header: "Country Calling Code",
    },
];

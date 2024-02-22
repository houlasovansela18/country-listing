"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import { DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Country = {
    flags: string;
    name: string;
    cca2: string;
    cca3: string;
    nativeName: string;
    idd: string;
    altSpellings: string[];
};

export const columns: ColumnDef<Country>[] = [
    {
        accessorKey: "flags",
        header: "Flag",
        cell: ({ row }) => (
            <Avatar>
                <AvatarImage src={row.original.flags} />
                <AvatarFallback>{row.original.cca2}</AvatarFallback>
            </Avatar>
        ),
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
        cell: ({ row }) => (
            <DialogTrigger asChild>
                <Button variant="ghost">{row.original.name}</Button>
            </DialogTrigger>
        ),
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

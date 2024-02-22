import { columns, Payment } from "@/components/columns";
import { DataTable } from "@/components/country-table";

async function getData(): Promise<Payment[]> {
    const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,cca2,cca3,altSpellings,idd"
    );
    const data = await res.json();
    return data.map((data: any) => {
        const nativeNameObj = Object.values(data.name.nativeName)[0] as {
            official: string;
        };
        return {
            flags: data.flags.png,
            name: data.name.official,
            cca2: data.cca2,
            cca3: data.cca2,
            nativeName: nativeNameObj ? nativeNameObj.official : "",
            idd: `${data.idd.root}, ${data.idd.suffixes[0]}`,
            altSpellings: data.altSpellings,
        };
    });
}

export default async function Home() {
    const data = await getData();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <DataTable columns={columns} data={data} />
        </main>
    );
}

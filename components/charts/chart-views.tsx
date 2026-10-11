"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TAB_TRIGGER_CLASS =
  "px-4 text-[0.8125rem] leading-[1.125rem] text-muted-foreground";
const TABLE_HEAD_CLASS = "text-[0.8125rem] leading-[1.125rem] font-semibold";

// A chart with the same numbers as a table behind a Chart / Table switch.
// The first column of the table names each row.
export function ChartViews({
  title,
  chart,
  caption,
  columns,
  rows,
  tabsClassName = "",
}: {
  // Shown beside the switch.
  title: string;
  chart: React.ReactNode;
  // Describes the table for assistive technology.
  caption: string;
  columns: readonly string[];
  rows: readonly (readonly (string | number)[])[];
  // For the switch's track, when the chart is not on the page background.
  tabsClassName?: string;
}) {
  return (
    <Tabs defaultValue="chart" className="gap-0">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <h3 className="text-title-3 font-semibold text-balance">{title}</h3>
        <TabsList
          aria-label="View results as"
          className={`group-data-horizontal/tabs:h-9 ${tabsClassName}`}
        >
          <TabsTrigger value="chart" className={TAB_TRIGGER_CLASS}>
            Chart
          </TabsTrigger>
          <TabsTrigger value="table" className={TAB_TRIGGER_CLASS}>
            Table
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="chart" keepMounted className="mt-6">
        {chart}
      </TabsContent>

      <TabsContent value="table" className="mt-6">
        <Table className="text-[0.9375rem] leading-[1.25rem] tabular-nums">
          <caption className="sr-only">{caption}</caption>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((column, index) => (
                <TableHead
                  key={column}
                  scope="col"
                  className={`${index > 0 ? "text-right" : ""} ${TABLE_HEAD_CLASS}`}
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row[0]}>
                {row.map((cell, index) =>
                  index === 0 ? (
                    <TableHead
                      key={index}
                      scope="row"
                      className="h-auto py-1.5 font-normal text-muted-foreground"
                    >
                      {cell}
                    </TableHead>
                  ) : (
                    <TableCell key={index} className="py-1.5 text-right">
                      {typeof cell === "number"
                        ? cell.toLocaleString("en-US")
                        : cell}
                    </TableCell>
                  ),
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  );
}

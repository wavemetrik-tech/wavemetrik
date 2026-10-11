"use client";

import { useRef, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gsap, useGSAP } from "@/lib/gsap";

import {
  accessPoints,
  levels,
  trafficClasses,
} from "../_data/sample-test-results";
import { formatLevel, ThroughputChart } from "./throughput-chart";

// −46 dBm: Model-1 has partly recovered while Model-2 is still blocked.
const INITIAL_INDEX = levels.indexOf(-46);

const TAB_TRIGGER_CLASS =
  "px-4 text-[0.8125rem] leading-[1.125rem] text-muted-foreground";
const TABLE_HEAD_CLASS = "text-[0.8125rem] leading-[1.125rem] font-semibold";

export function SampleTestResults() {
  const sectionRef = useRef<HTMLElement>(null);
  const [view, setView] = useState("chart");
  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".chart-cursor", { autoAlpha: 0 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          })
          .fromTo(
            ".chart-series",
            { clipPath: "inset(-8px 100% -8px -8px)" },
            {
              clipPath: "inset(-8px 0% -8px -8px)",
              duration: 1.4,
              ease: "power2.inOut",
              stagger: 0.15,
              clearProps: "clipPath",
            },
          )
          .to(".chart-cursor", { autoAlpha: 1, duration: 0.4 }, "-=0.35");
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="sample-test-results"
      ref={sectionRef}
      aria-labelledby="sample-test-results-heading"
      className="page-section"
    >
      <Tabs
        value={view}
        onValueChange={(value) => setView(String(value))}
        className="gap-0"
      >
        <header className="max-w-2xl">
          <h2 id="sample-test-results-heading" className="section-heading">
            Sample test results
          </h2>
          <p className="mt-4 text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-5">
            The plots show device throughput for each WMM traffic class as the
            MT-Wave interferer level is stepped from −20 dBm (heavy
            interference) to −70 dBm (negligible interference), for two access
            points.
          </p>
        </header>

        <div className="mt-10 flex flex-col-reverse gap-5 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          {view === "chart" && (
            <p className="text-footnote text-muted-foreground">
              Move across either chart to read both access points at the same
              interferer level.
            </p>
          )}
          <TabsList
            aria-label="View results as"
            className="shrink-0 group-data-horizontal/tabs:h-9 sm:ml-auto"
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
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-2">
            {accessPoints.map((result) => (
              <ThroughputChart
                key={result.id}
                result={result}
                activeIndex={activeIndex}
                onActiveIndexChange={setActiveIndex}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-6">
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-2">
            {accessPoints.map((result) => (
              <div key={result.id} className="min-w-0 border-t pt-6">
                <h3 className="text-title-2 font-semibold">{result.name}</h3>
                <p className="mt-1 text-subhead text-muted-foreground">
                  {result.detail}
                </p>
                <Table className="mt-5 text-[0.9375rem] leading-[1.25rem] tabular-nums">
                  <caption className="sr-only">
                    {result.name}: throughput in Mbps for each traffic class at
                    each interferer level
                  </caption>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead scope="col" className={TABLE_HEAD_CLASS}>
                        Level (dBm)
                      </TableHead>
                      {trafficClasses.map((item) => (
                        <TableHead
                          key={item.key}
                          scope="col"
                          className={`text-right ${TABLE_HEAD_CLASS}`}
                        >
                          {item.label}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {levels.map((level, index) => (
                      <TableRow key={level}>
                        <TableHead
                          scope="row"
                          className="h-auto py-1.5 font-normal text-muted-foreground"
                        >
                          {formatLevel(level)}
                        </TableHead>
                        {trafficClasses.map((item) => (
                          <TableCell
                            key={item.key}
                            className="py-1.5 text-right"
                          >
                            {result.throughput[item.key][index]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        </TabsContent>

        <div className="mt-14 border-t pt-6 sm:mt-16">
          <p className="max-w-[75ch] text-footnote/[1.25rem] text-muted-foreground">
            Model-1 supports up to Wi-Fi 6E and Model-2 up to Wi-Fi 7; for a
            like-for-like comparison MT-C24 was set to 802.11ax on 6 GHz.
            Interferer levels include over-the-air and cable losses.
          </p>
        </div>
      </Tabs>
    </section>
  );
}

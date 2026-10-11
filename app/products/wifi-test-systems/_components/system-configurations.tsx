"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { stationOptions, type SystemId, systems } from "../_data/systems";
import { LINK_KINDS, type LinkKind } from "@/components/diagrams/parts";
import {
  CompactDiagram,
  MeshDiagram,
  ScalableDiagram,
  Tr398Diagram,
} from "./system-diagrams";

const SEGMENT =
  "inline-flex min-h-11 items-center justify-center cursor-pointer rounded-md px-3.5 py-2 text-footnote font-medium text-muted-foreground transition-colors has-checked:bg-background has-checked:text-foreground has-checked:shadow-sm has-focus-visible:ring-2 has-focus-visible:ring-ring";

// Which link kinds each system's diagram contains.
const SYSTEM_LINKS: Record<SystemId, LinkKind[]> = {
  compact: ["interference", "clients"],
  scalable: ["interference", "clients"],
  tr398: ["interference", "clients", "backhaul"],
  mesh: ["interference", "clients", "backhaul"],
};

export function SystemConfigurations() {
  const [focus, setFocus] = useState<LinkKind | null>(null);
  const [modules, setModules] = useState<1 | 2 | 4>(2);

  return (
    <section
      id="system-configurations"
      aria-labelledby="system-configurations-heading"
      className="page-section"
    >
      <header className="max-w-2xl">
        <h2 id="system-configurations-heading" className="section-heading">
          System configurations
        </h2>
        <p className="mt-4 text-body/[1.75rem] text-pretty text-muted-foreground sm:mt-5">
          Each MT-SYS combines shielded enclosures, client emulators,
          programmable attenuators and MT-Wave. The layout changes with what is
          being tested: client scale, TR-398 performance, or mesh and roaming.
        </p>
      </header>

      <Tabs
        defaultValue={systems[0].id}
        onValueChange={() => setFocus(null)}
        className="mt-10 gap-0 sm:mt-14"
      >
        <TabsList
          aria-label="Test system"
          className="grid w-full grid-cols-2 group-data-horizontal/tabs:h-auto sm:inline-flex sm:w-fit"
        >
          {systems.map((system) => (
            <TabsTrigger
              key={system.id}
              value={system.id}
              className="min-h-11 px-2 py-2 text-[0.8125rem] leading-[1.125rem] text-muted-foreground sm:px-4"
            >
              {system.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {systems.map((system) => (
          <TabsContent key={system.id} value={system.id} className="mt-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-title-1 font-semibold text-balance">
                  {system.title}
                </h3>
                <p className="mt-2 text-callout/[1.5rem] text-pretty text-muted-foreground">
                  {system.description}
                </p>
              </div>

              {system.id === "scalable" && (
                <fieldset className="shrink-0">
                  <legend className="text-footnote text-muted-foreground">
                    Stations
                  </legend>
                  <div className="mt-2.5 inline-flex rounded-lg bg-muted p-[3px]">
                    {stationOptions.map((option) => (
                      <label key={option.stations} className={SEGMENT}>
                        <input
                          type="radio"
                          name="stations"
                          value={option.stations}
                          checked={modules === option.modules}
                          onChange={() => setModules(option.modules)}
                          className="sr-only"
                        />
                        {option.stations}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
            </div>

            <div className="mt-10">
              <p className="mb-4 text-footnote text-muted-foreground md:hidden">
                Scroll sideways to see the whole diagram.
              </p>
              {system.id === "scalable" && (
                <ScalableDiagram
                  focus={focus}
                  onHover={setFocus}
                  modules={modules}
                />
              )}
              {system.id === "tr398" && (
                <Tr398Diagram focus={focus} onHover={setFocus} />
              )}
              {system.id === "compact" && (
                <CompactDiagram focus={focus} onHover={setFocus} />
              )}
              {system.id === "mesh" && (
                <MeshDiagram focus={focus} onHover={setFocus} />
              )}
            </div>

            <div
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
              onPointerLeave={() => setFocus(null)}
            >
              {SYSTEM_LINKS[system.id].map((kind) => (
                <span
                  key={kind}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "touch") setFocus(kind);
                  }}
                  className="flex items-center gap-2 text-footnote text-muted-foreground transition-colors hover:text-foreground"
                >
                  <svg aria-hidden viewBox="0 0 28 4" className="h-1 w-7">
                    <path
                      d="M2 2 H26"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeDasharray={LINK_KINDS[kind].keyDash}
                      className={`fill-none ${LINK_KINDS[kind].stroke}`}
                    />
                  </svg>
                  {LINK_KINDS[kind].label}
                </span>
              ))}
            </div>

            <dl className="mt-10 grid gap-x-12 border-b sm:grid-cols-2 lg:grid-cols-3">
              {system.parts.map((part) => (
                <div key={part.name} className="border-t py-4">
                  <dt className="text-subhead font-semibold">{part.name}</dt>
                  <dd className="mt-0.5 text-subhead/[1.375rem] text-muted-foreground">
                    {part.role}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-footnote text-muted-foreground">
              {system.note}
            </p>

            {system.capabilities && system.testCases && (
              <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-2">
                <div>
                  <h4 className="text-title-3 font-semibold">Capabilities</h4>
                  <ul className="mt-4 flex flex-col gap-2 text-subhead/[1.375rem]">
                    {system.capabilities.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span
                          aria-hidden
                          className="mt-[0.5625rem] size-1 shrink-0 rounded-full bg-muted-foreground/60"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-title-3 font-semibold">Test cases</h4>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {system.testCases.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-muted px-3 py-1 text-footnote font-medium"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

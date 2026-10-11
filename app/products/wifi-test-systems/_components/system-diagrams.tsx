import {
  AccessPoint,
  Attenuator,
  ClientDevices,
  ClientModule,
  type DiagramLabel,
  DiagramFrame,
  Enclosure,
  ENCLOSURE_HEIGHT,
  Link,
  type LinkKind,
  MeshNode,
  MODULE_HEIGHT,
  MODULE_WIDTH,
  type Point,
  Splitter,
  WaveUnit,
} from "@/components/diagrams/parts";

type DiagramProps = {
  focus: LinkKind | null;
  onHover: (kind: LinkKind | null) => void;
};

const boxLabel = (name: string, x: number, y: number): DiagramLabel => ({
  text: name,
  x: x + 20,
  y: y + ENCLOSURE_HEIGHT - 14,
  anchor: "bottom",
  strong: true,
});

// MT-SYS-1: one enclosure and one MT-C24 on two attenuated paths.
export function CompactDiagram({ focus, onHover }: DiagramProps) {
  return (
    <DiagramFrame
      label="Block diagram: MT-Wave and one MT-C24 client module connected to a shielded enclosure holding the access point. The MT-C24 connects through two attenuators."
      labels={[
        { text: "MT-Wave", x: 195, y: 101, align: "center", anchor: "bottom" },
        boxLabel("Box-A", 400, 90),
        {
          text: "MT-C24, clients and sniffer",
          x: 500,
          y: 363,
          align: "center",
          anchor: "bottom",
        },
      ]}
    >
      <Enclosure x={400} y={90}>
        <AccessPoint />
      </Enclosure>
      <WaveUnit x={140} y={107} />
      <rect
        x={370}
        y={440}
        width={260}
        height={10}
        rx={5}
        className="fill-muted stroke-foreground/75"
      />
      <ClientModule x={390} y={370} radios={24} />

      <Link
        kind="interference"
        focus={focus}
        onHover={onHover}
        points={[
          [250, 135],
          [400, 135],
        ]}
      />
      <Link
        kind="clients"
        focus={focus}
        onHover={onHover}
        points={[
          [600, 180],
          [660, 180],
          [660, 390],
          [610, 390],
        ]}
      />
      <Link
        kind="clients"
        focus={focus}
        onHover={onHover}
        points={[
          [600, 150],
          [710, 150],
          [710, 414],
          [610, 414],
        ]}
      />
      <Attenuator x={660} y={285} vertical />
      <Attenuator x={710} y={285} vertical />
    </DiagramFrame>
  );
}

// MT-SYS-2 and 3: one enclosure, with one MT-C24 per 24 stations. Each module
// has its own attenuated path into the enclosure.
const SCALABLE_PATHS: { points: Point[]; attenuator: Point }[] = [
  {
    points: [
      [600, 120],
      [660, 120],
      [660, 282],
      [610, 282],
    ],
    attenuator: [660, 215],
  },
  {
    points: [
      [600, 90],
      [710, 90],
      [710, 360],
      [610, 360],
    ],
    attenuator: [710, 215],
  },
  {
    points: [
      [400, 150],
      [340, 150],
      [340, 438],
      [390, 438],
    ],
    attenuator: [340, 215],
  },
  {
    points: [
      [400, 120],
      [290, 120],
      [290, 516],
      [390, 516],
    ],
    attenuator: [290, 215],
  },
];

export function ScalableDiagram({
  focus,
  onHover,
  modules,
}: DiagramProps & { modules: 1 | 2 | 4 }) {
  const paths = SCALABLE_PATHS.slice(0, modules);
  const moduleY = (index: number) => 250 + index * 78;
  const baseY = moduleY(modules - 1) + MODULE_HEIGHT + 6;

  return (
    <DiagramFrame
      label={`Block diagram: MT-Wave and ${modules} MT-C24 client ${
        modules === 1 ? "module" : "modules"
      } connected to one shielded enclosure holding the access point, each module through its own attenuator.`}
      labels={[
        { text: "MT-Wave", x: 195, y: 41, align: "center", anchor: "bottom" },
        boxLabel("Box-A", 400, 30),
        {
          text: "MT-C24, clients and sniffer",
          x: 500,
          y: 243,
          align: "center",
          anchor: "bottom",
        },
      ]}
    >
      <Enclosure x={400} y={30}>
        <AccessPoint />
      </Enclosure>
      <WaveUnit x={140} y={47} />
      <rect
        x={370}
        y={baseY}
        width={260}
        height={10}
        rx={5}
        className="fill-muted stroke-foreground/75"
      />
      {paths.map((_, index) => (
        <ClientModule key={index} x={390} y={moduleY(index)} radios={24} />
      ))}

      <Link
        kind="interference"
        focus={focus}
        onHover={onHover}
        points={[
          [250, 75],
          [400, 75],
        ]}
      />
      {paths.map((path, index) => (
        <Link
          key={index}
          kind="clients"
          focus={focus}
          onHover={onHover}
          points={path.points}
        />
      ))}
      {paths.map((path, index) => (
        <Attenuator
          key={index}
          x={path.attenuator[0]}
          y={path.attenuator[1]}
          vertical
        />
      ))}
    </DiagramFrame>
  );
}

// Performance and TR-398: the access point and two mesh nodes, each in its
// own enclosure. MT-C24 serves the access point; MT-C12 reaches all three
// through a splitter.
export function Tr398Diagram({ focus, onHover }: DiagramProps) {
  return (
    <DiagramFrame
      label="Block diagram: three shielded enclosures holding an access point and two mesh nodes. MT-Wave and MT-C24 connect to the access point's enclosure. MT-C12 connects to all three through a splitter. Attenuated links join the enclosures to each other."
      labels={[
        { text: "MT-Wave", x: 115, y: 31, align: "center", anchor: "bottom" },
        boxLabel("Box-A", 300, 20),
        boxLabel("Box-B", 300, 205),
        boxLabel("Box-C", 300, 390),
        {
          text: "MT-C24, clients and sniffer",
          x: 850,
          y: 24,
          align: "center",
          anchor: "bottom",
        },
        {
          text: "MT-C12, clients and sniffer",
          x: 850,
          y: 190,
          align: "center",
        },
        { text: "Splitter", x: 662, y: 336, align: "center" },
      ]}
    >
      <Enclosure x={300} y={20}>
        <AccessPoint />
      </Enclosure>
      <Enclosure x={300} y={205}>
        <MeshNode />
      </Enclosure>
      <Enclosure x={300} y={390}>
        <MeshNode />
      </Enclosure>
      <WaveUnit x={60} y={37} />
      <ClientModule x={740} y={30} radios={24} />
      <ClientModule x={740} y={120} radios={12} />

      <Link
        kind="interference"
        focus={focus}
        onHover={onHover}
        points={[
          [170, 65],
          [300, 65],
        ]}
      />
      {/* Enclosure to enclosure */}
      <Link
        kind="backhaul"
        focus={focus}
        onHover={onHover}
        points={[
          [300, 140],
          [250, 140],
          [250, 235],
          [300, 235],
        ]}
      />
      <Link
        kind="backhaul"
        focus={focus}
        onHover={onHover}
        points={[
          [300, 325],
          [250, 325],
          [250, 420],
          [300, 420],
        ]}
      />
      <Link
        kind="backhaul"
        focus={focus}
        onHover={onHover}
        points={[
          [300, 110],
          [200, 110],
          [200, 450],
          [300, 450],
        ]}
      />
      {/* MT-C24 to the access point */}
      <Link
        kind="clients"
        focus={focus}
        onHover={onHover}
        points={[
          [740, 50],
          [500, 50],
        ]}
      />
      <Link
        kind="clients"
        focus={focus}
        onHover={onHover}
        points={[
          [740, 76],
          [500, 76],
        ]}
      />
      {/* MT-C12 through the splitter to every enclosure */}
      <Link
        kind="clients"
        focus={focus}
        onHover={onHover}
        points={[
          [740, 152],
          [712, 152],
          [712, 280],
          [684, 280],
        ]}
      />
      <Link
        kind="clients"
        focus={focus}
        onHover={onHover}
        points={[
          [640, 255],
          [560, 255],
          [560, 130],
          [500, 130],
        ]}
      />
      <Link
        kind="clients"
        focus={focus}
        onHover={onHover}
        points={[
          [640, 280],
          [500, 280],
        ]}
      />
      <Link
        kind="clients"
        focus={focus}
        onHover={onHover}
        points={[
          [640, 305],
          [560, 305],
          [560, 455],
          [500, 455],
        ]}
      />

      <Splitter x={640} y={230} />
      <Attenuator x={250} y={187} vertical />
      <Attenuator x={250} y={372} vertical />
      <Attenuator x={200} y={280} vertical />
      <Attenuator x={590} y={50} />
      <Attenuator x={650} y={76} />
      <Attenuator x={600} y={255} />
      <Attenuator x={535} y={280} />
      <Attenuator x={600} y={305} />
    </DiagramFrame>
  );
}

// MT-SYS-5: the access point, three mesh nodes and a box of real client
// devices. One MT-C24 serves the access point; the other reaches all four
// network enclosures through a splitter.
export function MeshDiagram({ focus, onHover }: DiagramProps) {
  const moduleX = 30;
  return (
    <DiagramFrame
      label="Block diagram: five shielded enclosures holding an access point, three mesh nodes and real client devices. MT-Wave and one MT-C24 connect to the access point's enclosure. A second MT-C24 connects to the four network enclosures through a splitter. Attenuated links join the enclosures to each other."
      labels={[
        { text: "MT-Wave", x: 925, y: 24, align: "center", anchor: "bottom" },
        boxLabel("Box-A", 600, 20),
        boxLabel("Box-B", 600, 205),
        boxLabel("Box-C", 600, 390),
        boxLabel("Box-D", 40, 390),
        boxLabel("Box-E", 40, 20),
        {
          text: "MT-C24, clients and sniffer",
          x: moduleX + MODULE_WIDTH / 2,
          y: 195,
          align: "center",
          anchor: "bottom",
        },
        { text: "Splitter", x: 402, y: 243, align: "center", anchor: "bottom" },
        { text: "To Box-A", x: 340, y: 472, anchor: "middle" },
        { text: "To Box-B", x: 340, y: 498, anchor: "middle" },
        { text: "To Box-C", x: 340, y: 524, anchor: "middle" },
      ]}
    >
      <Enclosure x={600} y={20}>
        <AccessPoint />
      </Enclosure>
      <Enclosure x={600} y={205}>
        <MeshNode />
      </Enclosure>
      <Enclosure x={600} y={390}>
        <MeshNode />
      </Enclosure>
      <Enclosure x={40} y={20}>
        <ClientDevices />
      </Enclosure>
      <Enclosure x={40} y={390}>
        <MeshNode />
      </Enclosure>
      <WaveUnit x={870} y={30} />
      <ClientModule x={moduleX} y={198} radios={24} />
      <ClientModule x={moduleX} y={274} radios={24} />

      <Link
        kind="interference"
        focus={focus}
        onHover={onHover}
        points={[
          [870, 58],
          [800, 58],
        ]}
      />
      {/* Enclosure to enclosure */}
      <Link
        kind="backhaul"
        focus={focus}
        onHover={onHover}
        points={[
          [800, 140],
          [850, 140],
          [850, 235],
          [800, 235],
        ]}
      />
      <Link
        kind="backhaul"
        focus={focus}
        onHover={onHover}
        points={[
          [800, 325],
          [850, 325],
          [850, 420],
          [800, 420],
        ]}
      />
      <Link
        kind="backhaul"
        focus={focus}
        onHover={onHover}
        points={[
          [800, 110],
          [905, 110],
          [905, 450],
          [800, 450],
        ]}
      />
      {[472, 498, 524].map((y) => (
        <Link
          key={y}
          kind="backhaul"
          focus={focus}
          onHover={onHover}
          points={[
            [240, y],
            [330, y],
          ]}
        />
      ))}
      {/* First MT-C24 to the access point */}
      <Link
        kind="clients"
        focus={focus}
        onHover={onHover}
        points={[
          [250, 230],
          [300, 230],
          [300, 50],
          [600, 50],
        ]}
      />
      {/* Second MT-C24 through the splitter */}
      <Link
        kind="clients"
        focus={focus}
        onHover={onHover}
        points={[
          [250, 306],
          [380, 306],
        ]}
      />
      <Link
        kind="clients"
        focus={focus}
        onHover={onHover}
        points={[
          [424, 266],
          [480, 266],
          [480, 120],
          [600, 120],
        ]}
      />
      <Link
        kind="clients"
        focus={focus}
        onHover={onHover}
        points={[
          [424, 290],
          [600, 290],
        ]}
      />
      <Link
        kind="clients"
        focus={focus}
        onHover={onHover}
        points={[
          [424, 314],
          [520, 314],
          [520, 450],
          [600, 450],
        ]}
      />
      <Link
        kind="clients"
        focus={focus}
        onHover={onHover}
        points={[
          [402, 348],
          [402, 440],
          [240, 440],
        ]}
      />

      <Splitter x={380} y={248} />
      <Attenuator x={850} y={187} vertical />
      <Attenuator x={850} y={372} vertical />
      <Attenuator x={905} y={280} vertical />
      <Attenuator x={440} y={50} />
      <Attenuator x={315} y={306} />
      <Attenuator x={480} y={190} vertical />
      <Attenuator x={540} y={290} />
      <Attenuator x={520} y={385} vertical />
      <Attenuator x={320} y={440} />
      {[472, 498, 524].map((y) => (
        <Attenuator key={y} x={285} y={y} />
      ))}
    </DiagramFrame>
  );
}

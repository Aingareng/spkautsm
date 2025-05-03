import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Label,
} from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  // ChartTooltip,
  // ChartTooltipContent,
} from "../../../shared/components/ui/chart";

const chartConfig = {
  asd: {
    label: "asd",
  },
} satisfies ChartConfig;

interface IProps {
  label: string;
  value: number;
}

export default function AutismResult({ label, value }: IProps) {
  const percentage = value;

  const chartData = [{ asd: percentage, fill: "var(--color-safari)" }];

  const sweepAngle = (percentage / 100) * 360;
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={90 - sweepAngle}
        innerRadius={80}
        outerRadius={140}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="asd" background cornerRadius={10} />
        <PolarRadiusAxis
          tick={false}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-4xl font-bold"
                    >
                      {percentage}%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      {label}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}

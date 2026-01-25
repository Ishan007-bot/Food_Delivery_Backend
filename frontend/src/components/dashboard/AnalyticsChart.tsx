import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { date: 'Jan 1', requests: 4000 },
  { date: 'Jan 5', requests: 3000 },
  { date: 'Jan 10', requests: 5000 },
  { date: 'Jan 15', requests: 4500 },
  { date: 'Jan 20', requests: 6000 },
  { date: 'Jan 25', requests: 5500 },
  { date: 'Jan 30', requests: 7000 },
  { date: 'Feb 5', requests: 6500 },
  { date: 'Feb 10', requests: 8000 },
  { date: 'Feb 15', requests: 7500 },
  { date: 'Feb 20', requests: 9000 },
  { date: 'Feb 25', requests: 8500 },
];

export function AnalyticsChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-lg)',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            formatter={(value: number) => [`${value.toLocaleString()} requests`, 'API Calls']}
          />
          <Area
            type="monotone"
            dataKey="requests"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRequests)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

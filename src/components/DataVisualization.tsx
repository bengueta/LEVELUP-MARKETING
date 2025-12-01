'use client';

import { useEffect, useRef, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { month: 'ינואר', value: 120 },
  { month: 'פברואר', value: 190 },
  { month: 'מרץ', value: 300 },
  { month: 'אפריל', value: 500 },
  { month: 'מאי', value: 800 },
  { month: 'יוני', value: 1200 },
];

export default function DataVisualization() {
  const chartRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import('gsap');
      
      if (chartRef.current) {
        gsap.fromTo(chartRef.current, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
        );
      }
    };

    animate();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    });
    
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={chartRef} className="glass-effect rounded-[24px] p-4 md:p-6 lg:p-8 h-full flex flex-col min-w-0">
      {/* Window controls */}
      <div className="flex gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm text-[#a1a1aa] mb-2">גדילה חודשית</h3>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-white">340%+</span>
            <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-sm flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div 
        ref={containerRef}
        className="flex-1 min-h-[200px] w-full" 
        style={{ 
          minWidth: '200px', 
          width: '100%',
          minHeight: '200px',
          aspectRatio: '16/9'
        }}
      >
        {dimensions.width > 0 && dimensions.height > 0 && (
          <ResponsiveContainer width="100%" height="100%" minHeight={200} minWidth={200}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#9333ea" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(24, 24, 27, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '12px',
                backdropFilter: 'blur(20px)',
              }}
              labelStyle={{ color: '#fafafa', marginBottom: '8px' }}
              itemStyle={{ color: '#9333ea' }}
              cursor={{ stroke: '#9333ea', strokeWidth: 2 }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#9333ea" 
              strokeWidth={3}
              fill="url(#colorGradient)"
              dot={{ fill: '#9333ea', r: 4, strokeWidth: 2, stroke: '#09090b' }}
              activeDot={{ r: 8, fill: '#c084fc', stroke: '#9333ea', strokeWidth: 2 }}
              animationDuration={1500}
            />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#71717a', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#71717a', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
        <div>
          <div className="text-xs text-[#71717a] mb-1">הכנסות</div>
          <div className="text-xl font-bold text-white">2.4M</div>
        </div>
        <div>
          <div className="text-xs text-[#71717a] mb-1">המרה</div>
          <div className="text-xl font-bold text-green-400">85%</div>
        </div>
        <div>
          <div className="text-xs text-[#71717a] mb-1">עלויות</div>
          <div className="text-xl font-bold text-blue-400">12K</div>
        </div>
      </div>
    </div>
  );
}


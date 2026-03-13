// src/components/BarChart.tsx
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Charts= (props: {
  // type:string[],
  // hours:number[]
  data: {
    type: string[],
    hours: number[]
  }
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chartRef.current) {
      // 初始化图表实例
      const chart = echarts.init(chartRef.current);

      // 配置图表的选项
      const option = {
        title: {
          text: 'Project Hours Distribution'
        },
        tooltip: {},
        xAxis: {
          axisLabel: {
            show: true, // 确保刻度标签显示
            interval: 0, // 强制显示所有刻度标签
            rotate: 45, // 如果标签过多，可以旋转标签以避免重叠
            margin: 10 // 设置标签与轴线的距离
          },
          data: props.data.type,
          barCategoryGap: '30%'
        },
        yAxis: {},
        series: [
          {
            name: '累计工时',
            type: 'bar',
            data: props.data.hours,
            barWidth: '30px'
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option);

      // 清理函数
      return () => {
        chart.dispose();
      };
    }
  });

  return <div ref={chartRef} style={{ width: '1000px', height: '400px' }} />;
};

export default Charts;

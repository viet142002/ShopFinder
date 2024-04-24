import { daysInMonth } from '@utils/daysInMonth';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { memo } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Nhập và bán ra'
        }
    },
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left'
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
                drawOnChartArea: false
            }
        }
    }
};

export const LineChart = memo(function LineChart({
    time = 'year',
    dataForChart
}) {
    let data = null;
    if (dataForChart) {
        if (time === 'year') {
            const labelsYear = Array.from({ length: 12 }, (_, i) => i + 1);
            data = {
                labels: labelsYear,
                datasets: [
                    {
                        label: 'Bán',
                        data: dataForChart.sell,
                        backgroundColor: 'rgba(20, 99, 250, .5)',
                        borderColor: 'rgba(20, 99, 250, .2)'
                    },
                    {
                        label: 'Nhập',
                        data: dataForChart.import,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)'
                    }
                ]
            };
        }
        if (time === 'month') {
            const labelsMonth = Array.from(
                { length: daysInMonth() },
                (_, i) => i + 1
            );
            data = {
                labels: labelsMonth,
                datasets: [
                    {
                        label: 'Bán',
                        data: dataForChart.sell,
                        backgroundColor: 'rgba(20, 99, 250, .5)',
                        borderColor: 'rgba(20, 99, 250, .2)'
                    },
                    {
                        label: 'Nhập',
                        data: dataForChart.import,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)'
                    }
                ]
            };
        }
        if (time === 'week') {
            const labelsYear = Array.from({ length: 7 }, (_, i) => i + 1);
            data = {
                labels: labelsYear,
                datasets: [
                    {
                        label: 'Bán',
                        data: dataForChart.sell,
                        backgroundColor: 'rgba(20, 99, 250, .5)',
                        borderColor: 'rgba(20, 99, 250, .2)'
                    },
                    {
                        label: 'Nhập',
                        data: dataForChart.import,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)'
                    }
                ]
            };
        }
    }
    return (
        <div className="rounded-xl bg-white p-4 shadow-card">
            {data && dataForChart && <Line options={options} data={data} />}
        </div>
    );
});

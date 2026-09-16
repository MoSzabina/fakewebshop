import { BarChart3 } from 'lucide-react'
import type { ReactNode } from 'react'
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import AdminLayout from '@/layouts/admin-layout'

const currDate = new Date().toLocaleDateString();

interface Stats {
    revenue: number
    orders: number
    customers: number
    averageOrder: number
}

interface SalesData {
    month: string
    revenue: number
    orders: number
}

interface CategoryData {
    name: string
    value: number
}

interface AdminProps {
    stats: Stats
    salesData: SalesData[]
    categoryData: CategoryData[]
}

export default function Admin({
    stats,
    salesData,
    categoryData,
}: AdminProps) {
    return (
        <AdminLayout>
            <div className="space-y-8">
                <div>
                    <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-sage">
                        <BarChart3 size={14} />
                        Admin
                    </div>

                    <h1>
                        Overview
                    </h1>

                    <p>
                        {currDate}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        label="Revenue"
                        value={`€${stats.revenue.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}`}
                        sub="Total revenue"
                        highlight
                    />

                    <StatCard
                        label="Orders"
                        value={stats.orders.toLocaleString('en-US')}
                        sub="Total orders"
                    />

                    <StatCard
                        label="Customers"
                        value={stats.customers.toLocaleString('en-US')}
                        sub="Registered customers"
                    />

                    <StatCard
                        label="Avg. Order"
                        value={`€${stats.averageOrder.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}`}
                        sub="Average order value"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="rounded border border-rule bg-white p-5 lg:col-span-2">
                        <div className="text-[15px] font-medium">
                            Revenue · 7 months
                        </div>

                        <div className="mt-1 text-[12px] text-ink-mid">
                            Monthly revenue
                        </div>

                        <div className="mt-6 h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData}>
                                    <CartesianGrid
                                        stroke="ink"
                                        vertical={false}
                                    />

                                    <XAxis
                                        dataKey="month"
                                        tick={{
                                            fontSize: 11,
                                            fill: 'ink-mid',
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <YAxis
                                        tick={{
                                            fontSize: 11,
                                            fill: 'ink-mid',
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <Tooltip />

                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="var(--color-sage)"
                                        fill="white"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="rounded border border-rule bg-white p-5">
                        <div className="text-[15px] font-medium">
                            Orders by Category
                        </div>

                        <div className="mt-1 text-[12px] text-ink-mid">
                            Share of orders
                        </div>

                        <div className="mt-6 h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={categoryData}
                                    layout="vertical"
                                    margin={{
                                        left: 10,
                                        right: 10,
                                    }}
                                >
                                    <XAxis
                                        type="number"
                                        domain={[0, 100]}
                                        tickFormatter={(value) => `${value}%`}
                                        tick={{
                                            fontSize: 10,
                                            fill: 'ink-mid',
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        width={75}
                                        tick={{
                                            fontSize: 10,
                                            fill: 'ink-mid',
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                    />

                                    <Tooltip
                                        formatter={(value) => [`${value}%`, 'Orders']}
                                    />

                                    <Bar
                                        dataKey="value"
                                        fill="var(--color-sage)"
                                        barSize={10}
                                        radius={[0, 2, 2, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="rounded border border-rule bg-white p-5">
                    <div className="text-[15px] font-medium">
                        Orders · 7 months
                    </div>

                    <div className="mt-1 text-[12px] text-ink-mid">
                        Monthly order volume
                    </div>

                    <div className="mt-6 h-[140px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesData}>
                                <CartesianGrid
                                    stroke="ink"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="month"
                                    tick={{
                                        fontSize: 11,
                                        fill: 'ink-mid',
                                    }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <YAxis
                                    tick={{
                                        fontSize: 11,
                                        fill: 'ink-mid',
                                    }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="orders"
                                    stroke="var(--color-sage)"
                                    strokeWidth={2}
                                    dot={{ r: 3 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

function StatCard({
    label,
    value,
    sub,
    highlight,
}: {
    label: string
    value: string
    sub: string
    highlight?: boolean
}) {
    return (
        <div className="flex flex-col gap-3 rounded border border-rule bg-parchment p-5">
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-mid">
                {label}
            </span>

            <span
                className={`text-[25px] font-medium tracking-[-0.02em] ${highlight
                        ? 'text-sage'
                        : 'text-ink'
                    }`}
            >
                {value}
            </span>

            <span className="text-[12px] text-ink-mid">
                {sub}
            </span>
        </div>
    )
}

Admin.layout = (page: ReactNode) => page

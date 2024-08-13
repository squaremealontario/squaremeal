import { FormControl, InputLabel, MenuItem, Select, styled } from "@mui/material";
import { PureComponent, useState } from "react";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from "@mui/x-charts";



var SupporterDashboard=()=>
{
    const [DataDaysBar, setDataDaysBar] = useState(7);
    const [DataBetweenBar, setDataBetweenBar] = useState();
    const demoUrl = 'https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5';

    
    const data = [
        {
        name: '19 May, 2024',
        uv: 4000,
        },
        {
        name: '20 May, 2024',
        uv: 3000,
        },
        {
        name: '21 May, 2024',
        uv: 2000,
        },
        {
        name: '22 May, 2024',
        uv: 2780,
        },
        {
        name: '23 May, 2024',
        uv: 1890,
        },
        {
        name: '24 May, 2024',
        uv: 2390,
        },
        {
        name: '25 May, 2024',
        uv: 3490,
        },
    ];

    
const data2 = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  
    class CustomizedAxisTick extends PureComponent {
        render() {
        const { x, y, stroke, payload } = this.props;
    
        return (
            <g transform={`translate(${x},${y})`}>
            <text x={40} y={20} dy={0} textAnchor="end" fill="#666" transform="rotate(0)" fontSize={12}>
                {payload.value}
            </text>
            </g>
        );
        }
    }

    class CustomizedAxisTickY extends PureComponent {
        render() {
        const { x, y, stroke, payload } = this.props;
    
        return (
            <g transform={`translate(${x},${y})`}>
            <text x={-10} y={0} dy={0} textAnchor="end" fill="#666" transform="rotate(0)" fontSize={12}>
                {payload.value}
            </text>
            </g>
        );
        }
    }

    
    const Customerdata = [
        { id: 0, value: 400, label: 'series A' },
        { id: 1, value: 35, label: 'series B' },
    ];
    
    const size = {
        width: "100%",
        height: "auto",
    };
    
    const StyledText = styled('text')(({ theme }) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 20,
    }));
    
    function PieCenterLabel({ children }) {
        const { width, height, left, top } = useDrawingArea();
        return (
        <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
        </StyledText>
        );
  }
  

    return(
        <>

        <div className="dashboard-supporter" id="supporter-view">
            <div className="inside-pannel-dash p-4">
                <div className="intermost-p-d">

                    {/* <div className="intermost-p-d-header">
                        <div className="flex justify-content-between align-items-center">
                            <div className="dash-head">
                                <h3>Dashboard</h3>
                            </div>
                            <div className="dash-cal flex align-items-center gap-4">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">19 May - 25 May, 2024</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={DataDaysBar}
                                    label="19 May - 25 May, 2024"
                                    onChange={(e)=>setDataDaysBar(e.target.value)}
                                >
                                    <MenuItem value={7}>Last 7 Days</MenuItem>
                                    <MenuItem value={10}>Last 10 Days</MenuItem>
                                    <MenuItem value={28}>Last 28 Days</MenuItem>
                                    <MenuItem value={30}>Last 1 Month</MenuItem>
                                    <MenuItem value={180}>Last 6 Months</MenuItem>
                                    <MenuItem value={365}>Last 1 Year</MenuItem>
                                    <MenuItem value={2024}>Last 2024</MenuItem>
                                    <MenuItem value={2023}>Last 2023</MenuItem>
                                    <MenuItem value={"Custom"}>Custom</MenuItem>
                                </Select>
                            </FormControl>
                                <div className="dash-refresh">
                                    <div className="-inner-refresh">
                                        <i class="fa-solid fa-rotate"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="i-p-d-main">
                        <div className="i-d-p-body">

                            <div className="i-d-p-body-in grid">

                                <div className="i-d-p-sm-sec-body">
                                    <div className="i-d-p-sm-inn grid">
                                        <div className="i-d-p-body-section flex gap-4 p-4">
                                            <div className="left-side-i-d-p-sm">

                                                <div className="upper-name-i-d-p">
                                                    <h4>
                                                    <i class="fa-solid fa-users"></i> Customers
                                                    </h4>
                                                </div>
                                                <div className="lower-detail">
                                                    <h3>
                                                        3,600
                                                    </h3>
                                                </div>
                                                <div className="last-detail">
                                                    <div className="flex align-items-center">
                                                        <h4 className="flex align-items-center">
                                                            <span>
                                                            <i class="fa-solid fa-up-long"></i>
                                                            </span>
                                                            5.75%
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>

                                            <ResponsiveContainer width={"100%"} height={"100%"}>
                                                <LineChart width={"100%"} height={"100%"} data={data2}>
                                                    <Line type="monotone" dataKey="uv" stroke="red" strokeWidth={2} />
                                                </LineChart>
                                            </ResponsiveContainer>

                                        </div>
                                        <div className="i-d-p-body-section flex gap-4 p-4">
                                            <div className="left-side-i-d-p-sm">

                                                <div className="upper-name-i-d-p">
                                                    <h4>
                                                    <AddShoppingCartOutlinedIcon></AddShoppingCartOutlinedIcon>Orders
                                                    </h4>
                                                </div>
                                                <div className="lower-detail">
                                                    <h3>
                                                    5,543
                                                    </h3>
                                                </div>
                                                <div className="last-detail">
                                                    <div className="flex align-items-center">
                                                        <h4 className="flex align-items-center">
                                                            <span>
                                                            <i class="fa-solid fa-up-long"></i>
                                                            </span>
                                                            1.75%
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>

                                            <ResponsiveContainer width={"100%"} height={"100%"}>
                                                <LineChart width={"100%"} height={"100%"} data={data2}>
                                                    <Line type="monotone" dataKey="pv" stroke="green" strokeWidth={2} />
                                                </LineChart>
                                            </ResponsiveContainer>

                                        </div>
                                        {/* <div className="i-d-p-body-section p-4">
                                            <div className="upper-name-i-d-p">
                                                <h4>
                                                <i class="fa-solid fa-dollar-sign"></i>Revenue
                                                </h4>
                                            </div>
                                            <div className="lower-detail">
                                                <h3>
                                                    $6,876
                                                </h3>
                                            </div>
                                            <div className="last-detail">
                                                <div className="flex align-items-center">
                                                    <h4 className="flex align-items-center">
                                                        <span>
                                                        <i class="fa-solid fa-up-long"></i>
                                                        </span>
                                                        7.75%
                                                    </h4>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="i-d-p-body-section p-4">
                                            <div className="upper-name-i-d-p">
                                                <h4 title="New Customers">
                                                    <i class="fa-solid fa-user-plus"></i>New Customers
                                                    
                                                </h4>
                                            </div>
                                            <div className="lower-detail">
                                                <h3>
                                                    + 456
                                                </h3>
                                            </div>
                                            <div className="last-detail">
                                                <div className="flex align-items-center">
                                                    <h4 className="flex align-items-center">
                                                        <span>
                                                        <i class="fa-solid fa-up-long"></i>
                                                        </span>
                                                        35.75%
                                                    </h4>
                                                </div>
                                            </div>

                                        </div> */}
                                    </div>

                                </div>

                                <div className="i-d-p-body-section">
                                    <div className="i-d-p-body-tabs flex align-items-center justify-content-between">
                                        <ul className="i-d-p-tabs-opts">
                                            <li className="active">Sales ($2011)</li>
                                            <li>Order Volume ($2011)</li>
                                        </ul>
                                        <FormControl fullWidth>
                                            {/* <InputLabel id="demo-simple-select-label">19 May - 25 May, 2024</InputLabel> */}
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={DataDaysBar}
                                                // label="19 May - 25 May, 2024"
                                                onChange={(e)=>setDataDaysBar(e.target.value)}
                                            >
                                                <MenuItem value={7}>Last 7 Days</MenuItem>
                                                <MenuItem value={10}>Last 10 Days</MenuItem>
                                                <MenuItem value={28}>Last 28 Days</MenuItem>
                                                <MenuItem value={30}>Last 1 Month</MenuItem>
                                                <MenuItem value={180}>Last 6 Months</MenuItem>
                                                <MenuItem value={365}>Last 1 Year</MenuItem>
                                                <MenuItem value={2024}>Last 2024</MenuItem>
                                                <MenuItem value={2023}>Last 2023</MenuItem>
                                                <MenuItem value={"Custom"}>Custom</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="i-d-p-graph-part my-4">
                                        <div className="i-d-p-graph-body">
                                            <ResponsiveContainer width={"100%"} height={300}>
                                                <LineChart
                                                data={data}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 10,
                                                }}
                                                >
                                                <CartesianGrid strokeDasharray="4 4"/>
                                                <XAxis dataKey="name" height={45} tick={<CustomizedAxisTick />}/>
                                                <YAxis  tick={<CustomizedAxisTickY />}/>
                                                <Tooltip />
                                                {/* <Legend /> */}
                                                <Line dataKey="uv" fill="blue" activeBar={<Rectangle fill="gold" stroke="purple" />}/>
                                                </LineChart >
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="i-d-p-lwr-body mt-4">
                                <div className="i-d-p-lwr-in-body grid">
                                        <div className="i-d-p-body-section flex gap-4 p-4">
                                            <div className="left-side-i-d-p-sm">

                                                <div className="upper-name-i-d-p">
                                                    <h4>
                                                        <i class="fa-solid fa-dollar-sign"></i> Revenue
                                                    </h4>
                                                </div>
                                                <div className="lower-detail">
                                                    <h3>
                                                        29.4K
                                                    </h3>
                                                </div>
                                                <div className="last-detail">
                                                    <div className="flex align-items-center">
                                                        <h4 className="flex align-items-center">
                                                            <span>
                                                            <i class="fa-solid fa-up-long"></i>
                                                            </span>
                                                            8.75%
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>

                                            <ResponsiveContainer width={"100%"} height={"100%"}>
                                                <LineChart width={"100%"} height={"100%"} data={data2}>
                                                    <Line type="monotone" dataKey="amt" stroke="red" strokeWidth={2} />
                                                </LineChart>
                                            </ResponsiveContainer>

                                        </div>
                                        <div className="i-d-p-body-section flex gap-4 p-4">
                                            <div className="left-side-i-d-p-sm">

                                                <div className="upper-name-i-d-p unvisible">
                                                    <h4 title="New Customers">
                                                    <i class="fa-solid fa-user-plus"></i> New
                                                    </h4>
                                                </div>
                                                <div className="upper-name-i-d-p position-absolute">
                                                    <h4 title="New Customers">
                                                    <i class="fa-solid fa-user-plus"></i> New Customers
                                                    </h4>
                                                </div>
                                                <div className="lower-detail">
                                                    <h3>
                                                        243
                                                    </h3>
                                                </div>
                                                <div className="last-detail">
                                                    <div className="flex align-items-center">
                                                        <h4 className="flex align-items-center">
                                                            <span>
                                                            <i class="fa-solid fa-up-long"></i>
                                                            </span>
                                                            14.75%
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>

                                            <ResponsiveContainer width={"100%"} height={"100%"} style={{paddingTop:20}}>
                                                <LineChart width={"100%"} height={"100%"} data={data2}>
                                                    <Line type="monotone" dataKey="pv" stroke="green" strokeWidth={2} />
                                                </LineChart>
                                            </ResponsiveContainer>

                                        </div>
                                        <div className="i-d-p-body-section flex gap-4 p-4">
                                            <div className="left-side-i-d-p-sm">

                                                <div className="upper-name-i-d-p unvisible">
                                                    <h4 title="Repeat Customers">
                                                    <i class="fa-solid fa-person-walking-arrow-loop-left"></i> Repeat
                                                    </h4>
                                                </div>
                                                <div className="upper-name-i-d-p position-absolute">
                                                    <h4 title="Repeat Customers">
                                                    <i class="fa-solid fa-person-walking-arrow-loop-left"></i> Repeat Customers
                                                    </h4>
                                                </div>
                                                <div className="lower-detail">
                                                    <h3>
                                                        1,584
                                                    </h3>
                                                </div>
                                                <div className="last-detail">
                                                    <div className="flex align-items-center">
                                                        <h4 className="flex align-items-center">
                                                            <span>
                                                            <i class="fa-solid fa-up-long"></i>
                                                            </span>
                                                            1.75%
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>

                                            <ResponsiveContainer width={"100%"} height={"100%"} style={{paddingTop:20}}>
                                                <LineChart width={"100%"} height={"100%"} data={data2}>
                                                    <Line type="monotone" dataKey="pv" stroke="green" strokeWidth={2} />
                                                </LineChart>
                                            </ResponsiveContainer>

                                        </div>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}


export default SupporterDashboard;
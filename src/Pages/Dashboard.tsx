
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { AreaChart, Area,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
interface User {
  created_at: string; // ISO date string
}

interface new_users{
  date: string;
  count: number;
}
interface DataPoint {
  new_users: new_users[];
  completed_part2_count: number;
  started_part1_not_part2_count: number;
}
interface SectionTimeData {
    section_id: string | number; // Can be number or string from API
    average_time_seconds: number;
  }
  
  // Define an array of colors for the bars
const COLORS = ['#0088FE', '#00C49F', '#FfBB28', '#FF8042', '#8884D8' , '#82CA9D', '#FFC0CB', '#A0522D', '#D2691E', '#FF6347', '#4682B4', '#6A5ACD', '#20B2AA', '#FF4500', '#2E8B57', '#8B4513'];
  

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [data2, setData2] = useState<SectionTimeData[]>([]);
  const [recentUsers, setRecentUsers] =  useState<number>(0);
  const [totalCompletedUsers, setTotalCompletedUsers] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {token} = useAuth();

  useEffect(() => {
    // Fetch user data from API
    fetch(`${process.env.REACT_APP_API_BASE_URL}/get_user_stats.php`,{
      headers:{
        "Authorization": `Bearer ${token}`, // Use token for authorization
        "Content-Type": "application/json" // Ensure the server knows we're sending JSON
      }
    })
        .then(response => response.json())
        .then((data: DataPoint[]) => {

          const newUsersData: DataPoint[] = data.new_users.map((item: DataPoint) => ({
            ...item,
            date: new Date(item.date).toISOString().split('T')[0] // Ensure valid date format (YYYY-MM-DD)
          }));
  
          setData(newUsersData);
  
          // Filter recent users (last 7 days)
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          const recentUsers = newUsersData.filter(item => new Date(item.date) >= sevenDaysAgo);
  
          // Set the total data and count of recent users
          setRecentUsers(recentUsers.length);
  
          // Set total completed users and active users
          const totalCompletedUsers = data.completed_part2_count;
          const activeUsers = data.started_part1_not_part2_count;
  
          setData(newUsersData);
          setRecentUsers(recentUsers.length);
          setTotalCompletedUsers(totalCompletedUsers);
          setActiveUsers(activeUsers);

        })
        .catch(error => console.error("Error fetching user data:", error)); // It's good practice to add error handling
  }, []);
useEffect(() => {
    const fetchSectionAverageTime = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/get_section_average_time.php`,
              {
                headers:{
                  "Authorization": `Bearer ${token}`, // Use token for authorization
                  "Content-Type": "application/json" // Ensure the server knows we're sending JSON
                }
              }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
    
            // Split the response into valid JSON parts and parse the first one
            const jsonParts = text.trim().split('\n').filter(part => part.startsWith('['));
            const apiData: SectionTimeData[] = JSON.parse(jsonParts[0]);
    
            const chartData = apiData.map(item => ({
                ...item,
                section_id: `Section ${item.section_id}`,
            }));
            setData2(chartData);
        } catch (err) {
            console.error("Error fetching section average time data:", err);
            setError(err instanceof Error ? err.message : "Failed to load data.");
        } finally {
            setLoading(false);
        }
    };

    fetchSectionAverageTime();
}, []);

  if (data.length === 0) {
    return <p>Loading chart data or no data available...</p>; // Provide feedback during loading or if no data
  }

  return (
    <div>
        <div className='flex flex-col items-center justify-center w-full px-[10%]'>
            <div className="flex flex-col justify-center w-full p-10 ">
                <div className="flex flex-col">
                    <h1 className=" font-(family-name:--font-bree) font-extrabold tracking-wide items-center text-center text-[30px] text-[#CE2C37]">HCP Dashboard</h1>
                    <p className="font-(family-name:--font-open-sans) text-center text-sm text-black my-5 ">A Detailed Dashboard of User and Course Section Stats   </p>
                  </div>
              </div>
        </div>
        <div className='mt-10 grid grid-rows-1 md:grid-cols-4 gap-2 '>
          <div className='flex flex-col items-start shadow-sm p-5 border-l-4 border-[#CE2C37]'>
            <span className='text-gray-400 font-bold text-xl'>New Users</span>
            <span className='text-black font-bold text-3xl'>{recentUsers}</span>
            <span className='text-gray-500' > in last 7 days</span>
          </div>
          <div className='flex flex-col items-start shadow-sm p-5 border-l-4 border-[#CE2C37]'>
            <span className='text-gray-400 font-bold text-xl'>Total Users</span>
            <span className='text-black font-bold text-3xl'>{data.length}</span>
            <span className='text-gray-500'> for the entire period</span>
          </div>
          <div className='flex flex-col items-start shadow-sm p-5 border-l-4 border-[#CE2C37]'>
            <span className='text-gray-400 font-bold text-xl'>Completed Users</span>
            <span className='text-black font-bold text-3xl'>{totalCompletedUsers}</span>
            <span className='text-gray-500'> who completed both parts</span>
          </div>
          <div className='flex flex-col items-start shadow-sm p-5 border-l-4 border-[#CE2C37]'>
            <span className='text-gray-400 font-bold text-xl'> Active Users</span>
            <span className='text-black font-bold text-3xl'>{activeUsers}</span>
            <span className='text-gray-500'> either started or completed part1</span>
          </div>
        </div>
        <div className='mt-10 text-black'>
          <h2 className=" font-(family-name:--font-bree) font-extrabold tracking-wide  text-[30px] text-[#CE2C37]">HCP User  Stats</h2>
          {/* <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => {
                        const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
                        return new Date(date).toLocaleDateString('en-US', options);
                      }} 
                    />
                    <YAxis allowDecimals={false} /> 
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} name="New Users" />
              </LineChart>
      </ResponsiveContainer> */}
      <ResponsiveContainer width="100%" height={300} className="mt-10">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => {
                        const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
                        return new Date(date).toLocaleDateString('en-US', options);
                      }} 
                    />
                <YAxis allowDecimals={false}/>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone" // For a smooth curve similar to the image
                  dataKey="count"
                  stroke="#8884d8" // Line color
                  fillOpacity={1}
                  fill="url(#colorUv)" // Shaded area fill, using the gradient defined above
                />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} name="New Users" />
              </AreaChart>
      </ResponsiveContainer>
        <h2 className=" font-(family-name:--font-bree) font-extrabold tracking-wide  text-[30px] text-[#CE2C37] mt-5">Avg Time Taken on each section</h2>
        <ResponsiveContainer width="100%" height={300} className="mt-10">
        <BarChart
            data={data2}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="section_id" />
            <YAxis label={{ value: 'Average Time (seconds)', angle: -90, position: 'insideLeft' }} allowDecimals={true} />
            <Tooltip formatter={(value: number) => `${value.toFixed(2)} seconds`} />
            <Legend />
            <Bar dataKey="average_time_seconds" name="Avg. Completion Time">
              {data2.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
    </div>
    </div>
  );
};

export default Dashboard;




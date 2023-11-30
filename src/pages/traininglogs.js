import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { useAuth } from '../hooks/useAuth';
import Sidebar from '../components/Sidebar';
import TrainingLog from '@/components/TrainingLog';
import SearchHeaderComponent from '@/components/SearchHeaderComponent';

export default function TrainingLogsPage() {
    const { userId } = useAuth();
    const [logs, setLogs] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (userId === -1) {
            router.push("/login");
        }
    }, [userId]);

    useEffect(() => {
        async function fetchLogs() {
            try {
                const res = await fetch("/api/admin/training");
                if (!res.ok) {
                    throw new Error('Failed to fetch training logs');
                }
                const data = await res.json();
                const userLogs = data.map(log => {
                    if (log.userId === userId) {
                        return log;
                    }
                })
                console.log('Fetched training logs:', userLogs);
                setLogs(userLogs);
            } catch (error) {
                console.error('Error fetching training logs:', error);
            }
        }

        if (userId !== -1) {
            fetchLogs();
        }
    }, [userId]);

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar selected="TL"/>
            <main style={{ flex: 1 }}>
                <div id="dashboard">
                    <SearchHeaderComponent/>
                    <h1>TrainingLogs dashboard</h1>
                    {logs?.map((log) => (
                        <TrainingLog userID={log.userId} animal={log.animal} title={log.title} date={log.date} description={log.description} hours={log.hours} />
                    ))}
                    <Sidebar/>
                </div>
            </main>
        </div> 
    );
}
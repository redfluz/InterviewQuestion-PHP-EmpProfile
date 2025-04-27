
import React, {useEffect, useState} from 'react';
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from 'react-router-dom';
import { EmployeeClass } from './class/EmployeeClass';

const List = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const api = new EmployeeClass(controller.signal);

        const fetchData = async () => {
            const data = await api.read();
            if (data) {
                setEmployees(data);
            }
        };

        fetchData().catch((error) => {
            console.error('Fetch error:', error);
        });

        return () => controller.abort();
    }, []);


    const addRecord = () => {
        navigate('/');
    };
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        <i className="bx bx-user mr-2"></i>
                        Employee List
                    </h1>
                    <button type="button" name="listButton" id="listButton" className="btn btn-add" onClick={addRecord}>
                Add Employee
                <i className="bx bx-list-ol"></i>
              </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {employees.length > 0 && 
                                    Object.keys(employees[0]).map(key => (
                                        <th 
                                            key={key}
                                            className="table-cell-center"
                                        >
                                            {key}
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {employees.map(employee => (
                                <tr key={Date.now() + Math.random()}>
                                    {Object.values(employee).map((value, i) => (
                                        <td 
                                            key={i} 
                                            className="table-cell-center"
                                        >
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default List;

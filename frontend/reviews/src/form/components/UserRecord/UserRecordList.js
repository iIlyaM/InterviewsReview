import { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
 
const UserRecordList = () => {
    const [userRecords, setUserRecord] = useState([]);
 
    useEffect(() => {
        getUserRecords();
    }, []);
 
    const getUserRecords = async () => {
        const response = await axios.get('http://localhost:8001/users/records/record');
        setUserRecord(response.data);
    }
 
    const deleteUserRecord = async (title) => {
        await axios.delete(`http://localhost:5000/users/records/record/${title}`);
        getUserRecords();
    }
 
    return (
        <div>
            <Link to="/add" className="button is-primary mt-2">Add New Record</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Rating</th>
                        <th>Specialization</th>
                        <th>Review</th>
                    </tr>
                </thead>
                <tbody>
                    { userRecords.map((userRecord, index) => (
                        <tr key={ userRecord.id }>
                            <td>{ index + 1 }</td>
                            <td>{ userRecord.company_name}</td>
                            <td>{ userRecord.record_title }</td>
                            <td>{ userRecord.record.rating }</td>
                            <td>{ userRecord.record.specialization }</td>
                            <td>{ userRecord.record.review }</td>
                            <td>
                                <Link to={`/edit/${userRecord.id}`} className="button is-small is-info">Edit</Link>
                                <button onClick={ () => deleteUserRecord(userRecord.record_title) } className="button is-small is-danger">Delete</button>
                            </td>
                        </tr>
                    )) }
                     
                </tbody>
            </table>
        </div>
    )
}
 
export default UserRecordList
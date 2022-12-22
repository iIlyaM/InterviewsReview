import { useState } from 'react'
import axios from "axios";
import { useHistory } from 'react-router-dom';
 
const AddUserRecord = () => {
    const [company_name, setCompanyName] = useState('');
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [review, setReview] = useState('');
    // const [user_id, setUserid] = useState('');
    const history = useHistory();
 

    var user_id = JSON.parse(localStorage.getItem('access_token'));
    console.log(user_id.id);

    const saveUserRecord = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8001/users/records/${user_id.id}/${company_name}/${title}/record`,{
            rating: rating,
            specialization: specialization,
            review: review,
        });
        history.push("/");
    }
 
    return (
        <div>
            <form onSubmit={ saveUserRecord }>
                <div className="field">
                    <label className="label">Title</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Company"
                        value={ company_name }
                        onChange={ (e) => setCompanyName(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">Title</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Title"
                        value={ title }
                        onChange={ (e) => setTitle(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <label className="label">Rating</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Rating"
                        value={ rating }
                        onChange={ (e) => setRating(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">Specialization</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Specialization"
                        value={ specialization }
                        onChange={ (e) => setSpecialization(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">Review</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Review"
                        value={ review }
                        onChange={ (e) => setReview(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <button className="button is-primary">Save</button>
                </div>
            </form>
        </div>
    )
}
 
export default AddUserRecord
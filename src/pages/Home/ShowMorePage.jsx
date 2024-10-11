import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { get, ref, update } from 'firebase/database'; 
import { useNavigate } from 'react-router-dom'; 
import db from '../../../firebase';
import 'animate.css'; 

const ShowMorePage = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null); 
    const [paymentStatus, setPaymentStatus] = useState(''); 
    const [userId] = useState('user1'); 
    const [paymentData, setPaymentData] = useState({
        name: '',
        email: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            const dbRef = ref(db, `ProjectsList/${id}`); 
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                setProject(snapshot.val());
            } else {
                console.log("No such project found!");
            }
        };

        fetchData();
    }, [id]);

    // Handle payment status update
    const handlePayment = async () => {
        if (paymentStatus) {
            const paymentRef = ref(db, `ProjectsList/${id}/paymentStatusList`); 
            await update(paymentRef, { [userId]: paymentStatus });
            alert('Payment status updated successfully!');
            navigate('/'); 
        } else {
            alert('Please select a payment status.');
        }
    };

    // Handle payment data change
    const handlePaymentDataChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({
            ...paymentData,
            [name]: value,
        });
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        console.log("Processing payment with data: ", paymentData);
        setPaymentStatus('completed'); 
        alert('Payment Successful! Thank you for your purchase.');
        setPaymentData({
            name: '',
            email: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
        }); 
    };

    if (!project) {
        return <p className="text-center mt-5 mb-5">Loading...</p>;
    }

    return (
        <div className="container mb-5">
            <h3 className="mt-5 mb-5">Project Details</h3>
           
            <div className="row justify-content-center">
                <div className="col-lg-8 border p-3 shadow-lg rounded animate__animated animate__fadeIn">
                    {project.projectImage ? (
                        <img 
                            src={project.projectImage} 
                            height={500} 
                            className="card-img-top shadow-lg rounded" 
                            alt={project.projectTitle} 
                        />
                    ) : (
                        <p className="text-center">Image not available</p>
                    )}
                    
                    <div className="card-body">
                        <h6 className="card-title">{project.projectName} 
                            <span style={{ color: '#5A639C' }}> Created at: {project.dateAdded}</span>
                        </h6>
                        <p className="card-text mt-4 mb-3"><b>Deadline</b>: {project.projectDeadline}</p>
                        <p className="card-text mt-4 mb-3"><b>Type</b>: {project.projectType}</p>
                        <p className="card-text mt-4 mb-3"><b>Location</b>: {project.location}</p>
                        <p className="card-text">{project.description}</p>
                    </div>
                    <Link 
                        to={`/edit/${id}`} 
                        className="btn btn-warning text-center py-1 mb-3 mx-auto mt-4 shadow-lg rounded"
                    >
                        Update
                    </Link>

                    {/* Payment Status Update Section */}
                    <div className="payment-section mt-4">
                        <h5>Update Payment Status</h5>
                        <select 
                            value={paymentStatus} 
                            onChange={(e) => setPaymentStatus(e.target.value)} 
                            className="form-control mb-3"
                        >
                            <option value="">Select Payment Status</option>
                            <option value="completed">Payment Completed</option>
                            <option value="pending">Payment Pending</option>
                        </select>
                        <button onClick={handlePayment} className="btn btn-primary">Submit Payment</button>
                    </div>

                    {/* Dummy Payment Form Section */}
                    <div className="payment-form mt-5">
                        <h5>Make a Payment</h5>
                        <form onSubmit={handlePaymentSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" name="name" value={paymentData.name} onChange={handlePaymentDataChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={paymentData.email} onChange={handlePaymentDataChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                <input type="text" className="form-control" id="cardNumber" name="cardNumber" value={paymentData.cardNumber} onChange={handlePaymentDataChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cvv" className="form-label">CVV</label>
                                <input type="text" className="form-control" id="cvv" name="cvv" value={paymentData.cvv} onChange={handlePaymentDataChange} required />
                            </div>
                            <button type="submit" className="btn btn-success">Pay Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowMorePage;

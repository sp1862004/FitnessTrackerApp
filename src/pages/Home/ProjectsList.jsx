import React, { useEffect, useState } from 'react';
import { useProjects } from '../../context/ProjectsContext'; 
import { ref, onValue } from 'firebase/database';
import db from '../../../firebase'; 
import { Link } from 'react-router-dom';
import 'animate.css';

const ProjectsList = () => {
    const { handleDelete } = useProjects(); 
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [paymentDetails, setPaymentDetails] = useState({}); 

    useEffect(() => {
        const projectRef = ref(db, 'ProjectsList');
        onValue(projectRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const projectList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setProjects(projectList);
            }
        });
    }, []);

    useEffect(() => {
        const fetchPaymentDetails = () => {
            const paymentRef = ref(db, 'ProjectsList');
            onValue(paymentRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const payments = {};
                    Object.keys(data).forEach(key => {
                        if (data[key].paymentStatusList) {
                            payments[key] = data[key].paymentStatusList;
                        }
                    });
                    setPaymentDetails(payments);
                }
            });
        };

        fetchPaymentDetails();
    }, []);

    const filteredProjects = projects.filter(project =>
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.projectStatus.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5 ">
            <div className="row d-flex justify-content-center mt-4">
                <div className="col-md-8">
                    <input
                        type="text"
                        className="form-control shadow-lg p-3 mb-5 bg-light rounded"
                        placeholder="Search projects by name or status..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="row">
                {filteredProjects.map((project) => (
                    <div key={project.id} className="col-md-6 mb-5">
                        <div className="card h-100 shadow-lg border-0 animated animate__fadeIn">
                            {/* Project Image */}
                            <img 
                                src={project.projectImage} 
                                className="card-img-top" 
                                alt={project.projectName} 
                                style={{ height: '200px', objectFit: 'cover' }} 
                            />
                            <div className="card-body">
                                {/* Project Information */}
                                <h5 className="card-title text-primary">{project.projectName}</h5>
                                <p className="card-text">
                                    <strong>Status:</strong> {project.projectStatus}<br />
                                    <strong>Due Date:</strong> {project.dueDate}<br />
                                </p>
                                
                                {/* Payment Information */}
                                <div className="payment-details mt-3">
                                    <h6>Payment Details:</h6>
                                    {paymentDetails[project.id] ? (
                                        <ul>
                                            {Object.keys(paymentDetails[project.id]).map((userId) => (
                                                <li key={userId}>
                                                    <strong>User {userId}:</strong> {paymentDetails[project.id][userId]}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No payment details available</p>
                                    )}
                                </div>

                                <Link to={`/ProjectDetails/${project.id}`} className="btn btn-primary mt-3">View Details</Link>
                                <button 
                                    onClick={() => handleDelete(project.id)} 
                                    className="btn btn-danger ms-3 mt-3"
                                >
                                    Delete
                                </button>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Added on {project.dateAdded}</small>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredProjects.length === 0 && (
                    <div className="text-center fs-1 mt-5 text-danger mb-5">
                        <h5>No projects found.</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsList;

import { push, ref, set } from 'firebase/database';
import { useForm } from 'react-hook-form';
import db from '../../../firebase'; 
import { useNavigate } from 'react-router-dom';
import 'animate.css';

const AddProject = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const navigate = useNavigate();

    // Handle image file upload for project image
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setValue('projectImage', reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data) => {
        const date = new Date(data.dueDate);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();

        const formattedData = {
            ...data,
            dueDate: `${day} ${month} ${year}`, 
            dateAdded: new Date().toLocaleDateString(), // Track when the project was added
        };

        // Save the new project in Firebase Realtime Database
        const newProjectRef = push(ref(db, "ProjectsList"));
        set(newProjectRef, formattedData)
            .then(() => {
                alert("Project added successfully");
                reset(); 
                navigate("/"); 
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="animate__animated animate__fadeIn">
            <h4 className='mb-4 mt-3 text-center'>Create New Project</h4>
            <div className="container">
                <div className="row d-flex mx-auto justify-content-center">
                    {/* Project Name Input */}
                    <div className="col-lg-10 mx-auto mt-3 mb-2">
                        <input
                            type="text"
                            className='form-control shadow py-3 border-primary'
                            {...register('projectName')}
                            autoFocus
                            placeholder='Project Name'
                        />
                    </div>

                    {/* Upload Project Image */}
                    <div className="col-lg-7 mt-3">
                        <label htmlFor="imageInput" className="form-label" style={{ color: '#365E32' }}>Upload Project Image</label>
                        <input
                            type="file"
                            className='form-control py-3 shadow border-primary'
                            id="imageInput"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Due Date Input */}
                    <div className="col-lg-3 mt-3">
                        <label htmlFor="dateInput" className="form-label" style={{ color: '#365E32' }}>Due Date</label>
                        <input
                            type="date"
                            className='form-control py-3 shadow border-primary'
                            id="dateInput"
                            {...register('dueDate')}
                        />
                    </div>

                    {/* Project Status Input */}
                    <div className="col-lg-10 mt-3">
                        <label htmlFor="projectStatus" className="form-label" style={{ color: '#365E32' }}>Project Status</label>
                        <select
                            className='form-control py-3 shadow border-primary'
                            {...register('projectStatus')}
                        >
                            <option value="">....... Select Project Status .......</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Location Input */}
                    <div className="col-lg-10 mt-3">
                        <label htmlFor="location" className="form-label" style={{ color: '#365E32' }}>Location</label>
                        <input
                            type="text"
                            className='form-control shadow py-3 border-primary'
                            {...register('location')}
                            placeholder='Location'
                        />
                    </div>

                    {/* Project Type Input */}
                    <div className="col-lg-10 mt-3">
                        <label htmlFor="projectType" className="form-label" style={{ color: '#365E32' }}>Project Type</label>
                        <input
                            type="text"
                            className='form-control shadow py-3 border-primary'
                            {...register('projectType')}
                            placeholder='Project Type'
                        />
                    </div>

                    {/* Project Deadline Input */}
                    <div className="col-lg-10 mt-3">
                        <label htmlFor="projectDeadline" className="form-label" style={{ color: '#365E32' }}>Project Deadline</label>
                        <input
                            type="date"
                            className='form-control py-3 shadow border-primary'
                            {...register('projectDeadline')}
                        />
                    </div>

                    {/* Project Description Input */}
                    <div className="col-lg-10 mt-3">
                        <label htmlFor="description" className="form-label" style={{ color: '#365E32' }}>Description</label>
                        <textarea
                            className='form-control shadow py-3 border-primary'
                            {...register('description')}
                            placeholder='Project Description'
                            rows="4"
                        ></textarea>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="row d-grid mt-3">
                    <div className="col-lg-10 mx-auto mb-4">
                        <button className='btn btn-primary text-center mx-auto py-2 mb-3 d-grid mx-auto'>Create Project</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddProject;

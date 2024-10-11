import { createContext, useContext, useState, useEffect } from 'react';
import { get, ref, remove, set } from 'firebase/database';
import db from '../../firebase';  

const ProjectsContext = createContext();

export const useProjects = () => useContext(ProjectsContext);

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);

    const fetchProjects = async () => {
        const dbRef = ref(db, "ProjectsList");  
        const snapshot = await get(dbRef);
        let projectArray = [];
        if (snapshot.exists()) {
            for (const key in snapshot.val()) {
                const project = snapshot.val()[key];
                projectArray.push({ id: key, ...project });
            }
        }
        setProjects(projectArray);  
    };

    // Handle project deletion
    const handleDelete = async (id) => {
        const dbRef = ref(db, `ProjectsList/${id}`);  
        await remove(dbRef);
        fetchProjects();  
    };

    // Handle project update
    const updateProject = async (id, updatedData) => {
        const dbRef = ref(db, `ProjectsList/${id}`);
        await set(dbRef, updatedData);
        fetchProjects(); 
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <ProjectsContext.Provider value={{ projects, handleDelete, updateProject }}>
            {children}
        </ProjectsContext.Provider>
    );
};

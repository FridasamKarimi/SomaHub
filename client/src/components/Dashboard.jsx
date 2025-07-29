import { useState, useEffect } from 'react';
     import axios from 'axios';
     import ResourceCard from './ResourceCard';

     function Dashboard({ token }) {
       const [resources, setResources] = useState([]);
       const [editResource, setEditResource] = useState(null);
       const [title, setTitle] = useState('');
       const [category, setCategory] = useState('');
       const [message, setMessage] = useState('');

       useEffect(() => {
         axios.get('http://localhost:5000/api/resources/user', {
           headers: { Authorization: `Bearer ${token}` },
         })
           .then(res => setResources(res.data))
           .catch(err => setMessage('Error fetching resources: ' + (err.response?.data?.error || 'Server error')));
       }, [token]);

       const handleEdit = (resource) => {
         setEditResource(resource);
         setTitle(resource.title);
         setCategory(resource.category);
       };

       const handleUpdate = async (e) => {
         e.preventDefault();
         try {
           const res = await axios.patch(`http://localhost:5000/api/resources/${editResource._id}`, { title, category }, {
             headers: { Authorization: `Bearer ${token}` },
           });
           setResources(resources.map(r => r._id === editResource._id ? res.data : r));
           setEditResource(null);
           setTitle('');
           setCategory('');
           setMessage('Resource updated successfully');
         } catch (err) {
           setMessage('Error updating resource: ' + (err.response?.data?.error || 'Server error'));
         }
       };

       const handleDelete = async (id) => {
         try {
           await axios.delete(`http://localhost:5000/api/resources/${id}`, {
             headers: { Authorization: `Bearer ${token}` },
           });
           setResources(resources.filter(r => r._id !== id));
           setMessage('Resource deleted successfully');
         } catch (err) {
           setMessage('Error deleting resource: ' + (err.response?.data?.error || 'Server error'));
         }
       };

       return (
         <div className="container mx-auto p-4">
           <h2 className="text-2xl font-bold mb-4">Your Dashboard</h2>
           {message && <p className="text-green-500 mb-4">{message}</p>}
           {editResource && (
             <form onSubmit={handleUpdate} className="mb-8 p-4 bg-gray-100 rounded-lg">
               <h3 className="text-xl font-semibold mb-4">Edit Resource</h3>
               <div className="mb-4">
                 <label className="block text-gray-700">Resource Title</label>
                 <input
                   type="text"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   className="w-full p-2 border rounded"
                   required
                 />
               </div>
               <div className="mb-4">
                 <label className="block text-gray-700">Category</label>
                 <select
                   value={category}
                   onChange={(e) => setCategory(e.target.value)}
                   className="w-full p-2 border rounded"
                   required
                 >
                   <option value="">Select Category</option>
                   <option value="Math">Math</option>
                   <option value="Science">Science</option>
                   <option value="History">History</option>
                 </select>
               </div>
               <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                 Update Resource
               </button>
               <button
                 type="button"
                 onClick={() => setEditResource(null)}
                 className="ml-4 text-blue-500 hover:underline"
               >
                 Cancel
               </button>
             </form>
           )}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {resources.map(resource => (
               <ResourceCard
                 key={resource._id}
                 resource={resource}
                 onEdit={handleEdit}
                 onDelete={handleDelete}
                 isEditable={true}
               />
             ))}
           </div>
         </div>
       );
     }

     export default Dashboard;
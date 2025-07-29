import { useState, useEffect } from 'react';
     import axios from 'axios';
     import ResourceCard from './ResourceCard';

     function Search() {
       const [resources, setResources] = useState([]);
       const [search, setSearch] = useState('');
       const [category, setCategory] = useState('');
       const [message, setMessage] = useState('');

       useEffect(() => {
         const params = new URLSearchParams();
         if (search) params.append('search', search);
         if (category) params.append('category', category);
         axios.get(`http://localhost:5000/api/resources?${params.toString()}`)
           .then(res => setResources(res.data))
           .catch(err => setMessage('Error fetching resources: ' + (err.response?.data?.error || 'Server error')));
       }, [search, category]);

       return (
         <div className="container mx-auto p-4">
           <h2 className="text-2xl font-bold mb-4">Search Resources</h2>
           {message && <p className="text-red-500 mb-4">{message}</p>}
           <div className="mb-8 p-4 bg-gray-100 rounded-lg">
             <div className="mb-4">
               <label className="block text-gray-700">Search by Title</label>
               <input
                 type="text"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full p-2 border rounded"
                 placeholder="Enter title..."
               />
             </div>
             <div className="mb-4">
               <label className="block text-gray-700">Category</label>
               <select
                 value={category}
                 onChange={(e) => setCategory(e.target.value)}
                 className="w-full p-2 border rounded"
               >
                 <option value="">All Categories</option>
                 <option value="Math">Math</option>
                 <option value="Science">Science</option>
                 <option value="History">History</option>
               </select>
             </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {resources.map(resource => (
               <ResourceCard
                 key={resource._id}
                 resource={resource}
                 isEditable={false}
               />
             ))}
           </div>
         </div>
       );
     }

     export default Search;
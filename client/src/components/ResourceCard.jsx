import { Link } from 'react-router-dom';

     function ResourceCard({ resource, onEdit, onDelete, isEditable }) {
       return (
         <div className="p-4 bg-white rounded-lg shadow">
           <h3 className="text-xl font-semibold">{resource.title}</h3>
           <p className="text-gray-600">Category: {resource.category}</p>
           <p className="text-gray-600">Uploaded by: {resource.userId?.email || 'Unknown'}</p>
           <Link
             to={resource.fileUrl}
             target="_blank"
             rel="noopener noreferrer"
             className="text-blue-500 hover:underline"
           >
             View Resource
           </Link>
           {isEditable && (
             <div className="mt-2">
               <button
                 onClick={() => onEdit(resource)}
                 className="bg-yellow-500 text-white p-1 rounded mr-2 hover:bg-yellow-600"
               >
                 Edit
               </button>
               <button
                 onClick={() => onDelete(resource._id)}
                 className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
               >
                 Delete
               </button>
             </div>
           )}
         </div>
       );
     }

     export default ResourceCard;
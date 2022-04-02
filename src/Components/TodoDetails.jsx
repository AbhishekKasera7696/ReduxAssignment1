import React from 'react';
import { useParams } from 'react-router-dom';

const TodoDetails = () => {
    const { id } = useParams();
    const [details, setDetails] = React.useState(null);
  

    
    React.useEffect(() => {
        fetch(`http://localhost:3002/todos/${id}`)
            .then((res) => res.json())
            .then((res) => setDetails(res))
            .catch((err) => console.log(err))
    }, []);

 

    if(details===null) {
        return <h1>...Loading Data</h1>
    }
    else if(details.length===0){
        return <h1>Todo does not exist</h1>
    }

    return (
        <div>
        <h1>Todo Details</h1>
        {   

            <div key={details.id}>
                    <h2>Todo Title: {details.title}</h2>
                    <h2>Todo status: {details.status ? "Completed" : "Not Completed"}</h2>
            </div>
        }
        </div>
    )
}

export {TodoDetails}
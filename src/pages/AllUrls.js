
import { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
function AllUrlsPage() {
    const firebase = useFirebase();
    const [data, setData] = useState([]);
    useEffect(() => {
        firebase.fetchAllUrl().then(data => setData(data.docs));
        console.log(data)
    }, [])

    return (
        <div>
            {data.map((data, idx) => (
                <h1>
                    {data.data().originalUrl} -  http://localhost:3000/redirect/{data.data().shortUrl}
                </h1>
            ))}
        </div>
    );
}

export default AllUrlsPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import ShoeItem from "../../components/ShoeItem/ShoeItem";

const NewArrival = () => {

    const url = "http://localhost:4000";

    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        fetchNewArrivals();
    }, []);

    const fetchNewArrivals = async () => {
        const res = await axios.get(
            `${url}/api/shoes/new-arrivals`
        );

        if (res.data.success) {
            setShoes(res.data.shoes);
        }
    };

    return (
        <div className="new-arrivals">

            <h2>New Arrivals</h2>

            <div className="shoe-grid">

                {shoes.map((shoe) => (
                    <ShoeItem
                        key={shoe._id}
                        shoe={shoe}
                    />
                ))}

            </div>

        </div>
    );
};

export default NewArrival;
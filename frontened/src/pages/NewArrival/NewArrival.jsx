import React, { useEffect, useState } from "react";
import axios from "axios";
import Shoes from "../../components/Shoes/Shoes";

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
                    <Shoes
                        key={shoe._id}
                        shoe={shoe}
                    />
                ))}

            </div>

        </div>
    );
};

export default NewArrival;
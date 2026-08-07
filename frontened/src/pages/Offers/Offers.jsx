import React, { useEffect, useState } from "react";
import axios from "axios";
import ShoeItem from "../../components/ShoeItem/ShoeItem";

const Offers = () => {

    const url = "http://localhost:4000";

    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {

        const res = await axios.get(
            `${url}/api/shoes/offers`
        );

        if (res.data.success) {
            setOffers(res.data.shoes);
        }
    };

    return (
        <div className="offers">

            <h2>Special Offers</h2>

            <div className="shoe-grid">

                {offers.map((shoe) => (
                    <ShoeItem
                        key={shoe._id}
                        shoe={shoe}
                    />
                ))}

            </div>

        </div>
    );
};

export default Offers;
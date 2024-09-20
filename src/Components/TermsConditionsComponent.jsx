import React from 'react'

const TermsConditionsComponent = ({ data }) => {

    return (
        <div>
            {data?.map((item) => (
                <div key={item.tripType}>
                    <h3>{item.tripType}</h3>
                    <ul>
                        {item.tC.map((tc) => (
                            <li key={tc._id}>{tc.text}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default TermsConditionsComponent

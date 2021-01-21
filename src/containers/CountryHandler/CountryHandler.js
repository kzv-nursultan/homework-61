import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Table} from 'reactstrap';

const CODE_URL = 'alpha/'

const CountryHandler = props => {
    const [countryInfo, setCountryInfo] = useState([]);
    const [borders, setBorders] = useState([]);


    useEffect(()=>{
        const fetchData = async () => {
            if(props.countryCode){
                const response = await axios.get(CODE_URL+props.countryCode);
                const neighbours = (response['data']['borders']);
                
                setCountryInfo(response['data']);
            };
        };
        fetchData().catch(console.error);
    },[props.countryCode]);

    return(
        <section>
           <div className="text-center">
               <Table dark>
                    <thead>
                        <tr>
                            <th>Name: {countryInfo.name} </th>
                        </tr>
                        <tr>
                            <th>Capital: {countryInfo.capital}</th>
                        </tr>
                     </thead>
                </Table>
           </div>
        </section>
    );
};

export default CountryHandler;

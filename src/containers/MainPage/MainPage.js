import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CountryNames from '../../components/CountryNames/CountryNames';
import CountryHandler from '../CountryHandler/CountryHandler';

const MAIN_URL = 'all?fields=name;alpha3Code';

const MainPage = () => {
    const [countries, setCountries] = useState([]);
    const [countryCode, setCountryCode] = useState(null);

    useEffect(()=>{
        const request = async () => {
            const response = await axios.get(MAIN_URL);
            setCountries(response['data']);
        };
        request().catch(console.error);
    },[]);

    return (
        <div className="d-flex position-relative">
            <div className="border border-danger">
                <ol className="table-hover">
                    {countries.map(country=>(
                    <CountryNames 
                    key = {country.alpha3Code}
                    name={country['name']}
                    code={country.alpha3Code}
                    clicked={setCountryCode}/>
                     ))}
                </ol>
            </div>
            <div className="position-fixed">
                <CountryHandler
                countryCode={countryCode}/>
            </div>
        </div>
    );
};

export default MainPage;
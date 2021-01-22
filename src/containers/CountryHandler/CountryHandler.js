import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
  import './CountryHandler.css'

const CODE_URL = 'alpha/';

const CountryHandler = props => {
    const [countryInfo, setCountryInfo] = useState(null);
    const [borders, setBorders] = useState([]);


    useEffect(()=>{
        const fetchData = async () => {
            if(props.countryCode){
                const response = await axios.get(CODE_URL+props.countryCode);
                const neighbours = (response['data']['borders']);
                const promises = neighbours.map(async neighbour =>{
                    const useUrl = CODE_URL + neighbour;
                    const countryResponse = await axios.get(useUrl);
                    return(countryResponse['data']['name']);
                });
                const bordersInfo = await Promise.all(promises);
                setBorders(bordersInfo);            
                setCountryInfo(response['data']);
            };
        };
        fetchData().catch(console.error);
    },[props.countryCode]);

    const borderInfo = (
        (borders.length > 0) ? 
        borders.map(border=>(
            <li key={border+1}>
                {border}
            </li>
        ))
        :
        'No borders found. May be it is an island?'
    );

    const cardBody = (
        (!countryInfo) ? 

        <Card className="mt-5 p-3 bg-dark text-white text-center">
            <strong>Select Country</strong>
        </Card>

        :

        <Card>
        <CardImg className='CardImg' src={countryInfo.flag} 
                 alt="Card image cap" />
        <CardBody>
           <CardTitle tag="h5">
               Name: {countryInfo.name}
           </CardTitle>
           <CardSubtitle tag="h6" className="mb-2 text-muted">
               Capital: {countryInfo.capital}
           </CardSubtitle>
           <div>
                   <strong>
                       Borders:
                   </strong>
                   <ol>    
                       {borderInfo}
                   </ol>
           </div>
        </CardBody>
   </Card>
        
    );

    return(
        <section>
         {cardBody}
        </section>
    );
};

export default CountryHandler;

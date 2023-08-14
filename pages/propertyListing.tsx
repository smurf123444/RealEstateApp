import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import {Button, Box, ButtonGroup, Grid, Typography, Stack, Divider, Container} from '@mui/material';

import { getCookie } from 'typescript-cookie';
import axios from "axios";
import TopNav from "../components/nav/TopNav";
import BottomNav from "../components/nav/BottomNav";
import MembersPage from "../components/Members";
import PropertyPage from "../components/PropertyListing";

  let called1 = false;
  let called2 = false;
export default function Auth() {    const [userName, setUserName] = useState('');
const [accountType, setAccountType] = useState('');

const [propertyName, setPropertyName] = useState('');
const [propertyType, setPropertyType] = useState('');
const [bedrooms, setBedrooms] = useState(0);
const [bathrooms, setBathrooms] = useState(0);
const [propertySize, setPropertySize] = useState('');
const [price, setPrice] = useState('');
const [location, setLocation] = useState('');
const [picturesURLs, setPicturesURLs] = useState([]);
const [realtorName, setRealtorName] = useState('');
const [description, setDescription] = useState('');

const router = useRouter()
let authenticated = false;
    useEffect(() => {
       let tokenCall = getCookie('Token')
       let username = getCookie('Username')
       const accountType = getCookie('AccountType')
       setAccountType(accountType)
       setUserName(
        username
      );
        const handleAuth = async () => {
            try {
           const response = await axios.post<{ message: string }>('http://192.168.1.235:3000/api/activeToken', {
              token: tokenCall
            });
            let responseString = response.data.message.toString()
          if (responseString = 'Successfully Authenticated')
          {
            console.log(responseString)
            authenticated = true;
          }
            } catch (error) {
              router.push('/login')
              console.log("Couldnt authenticate....")
              return (
                  false
                 )
            }
          }
          if(called1 == false)
          {
            handleAuth();
            called1 = true;
          }

const handleInfo = async () => {
    try {
   const response = await axios.post<{ rowID: string, data: any }>('http://192.168.1.235:3000/api/accountInfo', {
      token: tokenCall,
      username: username
    });
    setUserName(response.data.data.username.toString());
    setPropertyName(response.data.data.listingName.toString());
    
    // For images, ensure the response provides an array or convert it accordingly
    setPicturesURLs(response.data.data.PicturesURLs.split(',')); // assuming comma-separated values
    
    setPropertyType(response.data.data.propertyType.toString());
    setBedrooms(Number(response.data.data.bedrooms)); 
    setBathrooms(Number(response.data.data.bathrooms)); 
    setPropertySize(response.data.data.propertySize.toString());
    setPrice(response.data.data.pricePerDay.toString()); // using PricePerDay for property price
    setLocation(response.data.data.Address.toString());
    setDescription(response.data.data.description.toString());
    setRealtorName(response.data.data.realtorName.toString());
    
      console.log(response.data.data.ID)
        return(response.data.data)
    } catch (error) {

      return (
          false
         )
    }
  } 
   if (called2 == false) {
    handleInfo();
    called2 = true;
}

});


return (
  
    <div>
        <TopNav accountType={accountType} />
        <br />
        <PropertyPage
            ID={userName}
            propertyName={propertyName}
            propertyType={propertyType}
            bedrooms={bedrooms}
            bathrooms={bathrooms}
            propertySize={propertySize}
            price={price}
            location={location}
            picturesURLs={picturesURLs}
            realtorName={realtorName}
            description={description}
        />
        <br />
        <BottomNav />
    </div>
);

}
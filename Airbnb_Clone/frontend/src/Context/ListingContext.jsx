import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export const listingDataContext = createContext()

function ListingContext({children}) {
    let navigate = useNavigate() 
    let { serverUrl } = useContext(authDataContext)

    // Form States
    let [title, setTitle] = useState("")
    let [description, setDescription] = useState("")
    let [frontEndImage1, setFrontEndImage1] = useState(null)
    let [frontEndImage2, setFrontEndImage2] = useState(null)
    let [frontEndImage3, setFrontEndImage3] = useState(null)
    let [backEndImage1, setBackEndImage1] = useState(null)
    let [backEndImage2, setBackEndImage2] = useState(null)
    let [backEndImage3, setBackEndImage3] = useState(null)
    let [rent, setRent] = useState("")
    let [city, setCity] = useState("")
    let [landmark, setLandmark] = useState("")
    let [category, setCategory] = useState("")

    // Status States
    let [adding, setAdding] = useState(false)
    let [updating, setUpdating] = useState(false)
    let [deleting, setDeleting] = useState(false)

    // Data States
    let [listingData, setListingData] = useState([])
    let [newListData, setNewListData] = useState([])
    let [cardDetails, setCardDetails] = useState(null)
    let [searchData, setSearchData] = useState([])

    const handleAddListing = async () => {
        setAdding(true)
        try {
            let formData = new FormData()
            formData.append("title", title)
            formData.append("image1", backEndImage1)
            formData.append("image2", backEndImage2)
            formData.append("image3", backEndImage3)
            formData.append("description", description)
            formData.append("rent", rent)
            formData.append("city", city)
            formData.append("landmark", landmark)
            formData.append("category", category)
        
            let result = await axios.post(`${serverUrl}/api/listing/add`, formData, { withCredentials: true })
            
            setAdding(false)
            toast.success("Listing Added Successfully")
            
            // Reset Form
            setTitle(""); setDescription(""); setRent(""); setCity(""); setLandmark(""); setCategory("");
            setFrontEndImage1(null); setFrontEndImage2(null); setFrontEndImage3(null);
            setBackEndImage1(null); setBackEndImage2(null); setBackEndImage3(null);
            
            navigate("/")
        } catch (error) {
            setAdding(false)
            console.error(error)
            toast.error(error.response?.data?.message || "Failed to add listing")
        }
    }

    const handleViewCard = async (id) => {
        try {
            let result = await axios.get(`${serverUrl}/api/listing/findlistingByid/${id}`, { withCredentials: true })
            setCardDetails(result.data)
            navigate("/viewcard")
        } catch (error) {
            console.error(error)
        }
    }

    // --- NEW DELETE FUNCTION ---
    const handleDeleteListing = async (id) => {
        setDeleting(true);
        try {
            await axios.delete(`${serverUrl}/api/listing/delete/${id}`, { withCredentials: true });
            toast.success("Listing Deleted Successfully");
            setDeleting(false);
            // Refresh the data immediately
            getListing(); 
        } catch (error) {
            setDeleting(false);
            console.error(error);
            toast.error("Failed to delete");
        }
    }

    const handleSearch = async (data) => {
        if (!data) {
            setSearchData([])
            return
        }
        try {
            let result = await axios.get(`${serverUrl}/api/listing/search?query=${data}`)
            setSearchData(result.data)
        } catch (error) {
            setSearchData(null)
            console.error(error)
        }
    }

    const getListing = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/listing/get`, { withCredentials: true })
            setListingData(result.data)
            setNewListData(result.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getListing()
    }, [adding, updating, deleting])

    let value = {
        title, setTitle,
        description, setDescription,
        frontEndImage1, setFrontEndImage1,
        frontEndImage2, setFrontEndImage2,
        frontEndImage3, setFrontEndImage3,
        backEndImage1, setBackEndImage1,
        backEndImage2, setBackEndImage2,
        backEndImage3, setBackEndImage3,
        rent, setRent,
        city, setCity,
        landmark, setLandmark,
        category, setCategory,
        handleAddListing,
        adding, setAdding,
        listingData, setListingData,
        getListing,
        newListData, setNewListData,
        handleViewCard,
        cardDetails, setCardDetails,
        updating, setUpdating,
        deleting, setDeleting,
        handleSearch, searchData, setSearchData,
        handleDeleteListing // <--- Exported here
    }

    return (
        <listingDataContext.Provider value={value}>
            {children}
        </listingDataContext.Provider>
    )
}

export default ListingContext
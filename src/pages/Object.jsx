import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Header from '../components/Header'
import Spinner from '../components/UI/Spinner'


const Aufnahme = () => {

    const [loading, setLoading] = useState(true)
    const [object, setObject] = useState(null)
    
    
const navigate = useNavigate()
const params = useParams()

useEffect(() => {
    const fetchImage = async () =>{
        const docRef = doc(db, 'objects', params.objectId)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists) {
            setObject(docSnap.data())
            setLoading(false)
        }

    }
    fetchImage()
}, [params.objectId]) 

if(loading) {
    return <Spinner />
}
if(!loading) {
    return (

        <div className='Object'>
            <Header />
            <img src={object.imgUrls} width="100%"/>
            <h4>{object.katalogId}</h4>
        </div>
      )
} 
}

export default Aufnahme
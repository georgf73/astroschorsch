import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Header from '../components/Header'
import Spinner from '../components/UI/Spinner'


const Aufnahme = () => {

    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState(null)
    
    
const navigate = useNavigate()
const params = useParams()

useEffect(() => {
    const fetchImage = async () =>{
        const docRef = doc(db, 'aufnahmen', params.aufnahmeId)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists) {
            console.log(docSnap.data())
            setImage(docSnap.data())
            setLoading(false)
        }

    }
console.log(params.aufnahmeId)
    fetchImage()
}, [params.aufnahmeId]) 

if(loading) {
    return <Spinner />
}
if(!loading) {
    return (

        <div className='aufnahme'>
            <Header />
            <img src={image.imgUrls} width="100%"/>
            Aufnahme
        </div>
      )
} 
}

export default Aufnahme
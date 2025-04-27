import { useState } from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { useEffect } from "react";
import axios from "axios";
import Main from "./Components/Main";

function App(){
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  async function getPhotos(){
    setLoading(true);
    const response = await axios.get("https://api.unsplash.com/photos", {
      params: {
        client_id: "81mkQAWSdmmNVQsQAEy8nDqPQaBQLA3SU2oqm9fcOrE",
        page: page,
        per_page: 10,
      }
    });
    setImages((prevImages) => [...prevImages, ...response.data]);
    setLoading(false);
    // console.log(response.data)
  }

  useEffect(() => {
    getPhotos();
  }, [page])

  useEffect(() => {
    const handleScorll = () => {
      if(Math.ceil(window.scrollY) + window.innerHeight >= document.body.offsetHeight){
        setPage((prevPage) => prevPage + 1);
      }
    }

    window.addEventListener("scroll", handleScorll);
    return () => window.removeEventListener("scroll", handleScorll);
  }, [])
  return (
    <>
      <Header />
      <Main images={images} loading={loading} page={page}/>
      <Footer />
    </>
  )
}

export default App;
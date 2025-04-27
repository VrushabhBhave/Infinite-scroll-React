import axios from "axios";
import { useState } from "react";

function Main({ images, loading }) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [singleImageInfo, setSingleImageInfo] = useState({});

  async function openSingleImageInfo(id) {
    setModalVisibility(!modalVisibility);
    const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
      params: {
        client_id: "81mkQAWSdmmNVQsQAEy8nDqPQaBQLA3SU2oqm9fcOrE",
      },
    });
    console.log(response.data);
    setSingleImageInfo(response.data);
  }

  function closeSinglePageInfo() {
    setSingleImageInfo({});
    setModalVisibility(false);
  }
  return (
    <div className="p-4 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 relative">
      {images.map((image) => (
        <div
          key={image.id}
          className="image-container relative text-white border-black border-1 rounded"
          onClick={() => openSingleImageInfo(image.id)}
        >
          <div className="content absolute p-5 space-y-5 text-lg">
            <h1>{image.user.name}</h1>
            <p>{image.description}</p>
            <p>{image.created_at}</p>
          </div>
          <div className="image">
            <img
              src={image.urls.full}
              alt={image.alt_description}
              className="w-full object-cover rounded"
            />
          </div>
        </div>
      ))}
      <div
        className={`dialog-container h-full w-full absolute top-0 left-0 bg-black/50 flex items-center justify-center ${
          modalVisibility ? "visible" : "invisible"
        }`}
      >
        <div className="dialog-box w-[90%] bg-white p-6 rounded-2xl fixed top-25 h-[80%]">
          <div className="close relative" onClick={closeSinglePageInfo}>
            <span className="absolute right-1 text-2xl cursor-pointer">x</span>
          </div>
          <div className="content flex w-[100%] h-[100%]">
            <div className="left w-[50%] h-[100%] rounded-l-2xl">
              {singleImageInfo?.urls?.full ? (
                <img
                  src={singleImageInfo?.urls.full}
                  className="w-[100%] h-[100%] object-cover block rounded-l-2xl"
                />
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div className="right h-[100%] w-[50%] py-2 pl-10">
              {singleImageInfo?.urls?.full ? (
                <>
                    <h1 className="text-2xl font-bold mb-1">{`Uploaded By: ${singleImageInfo?.user.name} (@${singleImageInfo?.user.id})`}</h1>
                    <h2 className="text-xl font-medium mb-5">Upload Date: {singleImageInfo.created_at}</h2>
                    <hr/>
                    <p className="mt-7 mb-1 font-bold ">Width: {singleImageInfo.width}</p>
                    <p className="mb-5 font-bold">Height: {singleImageInfo.height}</p>
                    <hr />
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading && <p className="text-center">Loading...</p>}
    </div>
  );
}

export default Main;

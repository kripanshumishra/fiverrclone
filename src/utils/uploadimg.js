import axios from "axios";

const uploadimg = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");
  data.append("cloud_name", "dwnsqj7f5");
  try {
    const cloudinaryApi = import.meta.env.VITE_CLOUDINARY;
    const res = await axios.post(
      cloudinaryApi,
      data
    );
    return res.data.url

  } catch (err) {
    console.log("uploadImg()", err);
  }
};

export default uploadimg

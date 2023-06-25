import axios from "axios";

const uploadimg = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");
  data.append("cloud_name", "dwnsqj7f5");
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dwnsqj7f5/image/upload",
      data
    );
    return res.data.url

  } catch (err) {
    console.log("uploadImg()", err);
  }
};

export default uploadimg

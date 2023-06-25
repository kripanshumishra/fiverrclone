import React, {useCallback , useState , useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import "./DragAndDrop.css"

export default function MyDropzone() {
    const [imageFiles, setImageFiles] = useState([]);
    const [images, setImages] = useState([]);
    const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
  
    const changeHandler = (files) => {
      const validImageFiles = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.match(imageTypeRegex)) {
          validImageFiles.push(file);
        }
      }
      if (validImageFiles.length) {
        setImageFiles(validImageFiles);
        return;
      }
      alert("Selected images are not of valid type!");
    };
  
    useEffect(() => {
        let fileReaders = [];
      let isCancel = false;
      // source https://blog.logrocket.com/using-filereader-api-preview-images-react/
      if (imageFiles.length) {
        const promises = imageFiles.map(file => {
            return new Promise((resolve, reject) => {
              const fileReader = new FileReader();
              fileReaders.push(fileReader);
              fileReader.onload = (e) => {
                const { result } = e.target;
                if (result) {
                  resolve(result);
                }
              }
              fileReader.onabort = () => {
                reject(new Error("File reading aborted"));
              }
              fileReader.onerror = () => {
                reject(new Error("Failed to read file"));
              }
              fileReader.readAsDataURL(file);
            })
          });
          Promise
            .all(promises)
            .then(images => {
              if (!isCancel) {
                setImages(images);
              }
            })
            .catch(reason => {
              console.log(reason);
            });
      };
      return () => {
        isCancel = true;
        fileReaders.forEach(fileReader => {
          if (fileReader.readyState === 1) {
            fileReader.abort()
          }
        })
      }
    }, [imageFiles]);
    
  const onDrop = useCallback(acceptedFiles => {
    console.log( typeof( acceptedFiles ) )
    changeHandler( acceptedFiles )
  }, [])
  console.log( images , "url" )
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop , noClick: true})

  return (
        <label className='dnd-container' {...getRootProps()}>
      <input multiple="true" {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
          // try handling img one by one and if you need to remove the image just iterate over the image and filer on the bases of its id and for unique id we can use cuid module 
      }
    </label>
  )
}
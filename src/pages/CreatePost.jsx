import { useState } from 'react'
import { addDoc, collection, Timestamp } from '@firebase/firestore'
import { db, auth, storage } from '../firebase-config'
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [postText, setPostText] = useState('')
  const [images, setImages] = useState('')
  const [progress, setProgress] = useState(0)
  const [endSubmit, setEndsubmit] = useState(false)

  const postsCollectionRef = collection(db, 'posts')

  const handleImageChanged = e => {
    setImages(e.target.files[0])
  }

  const createPost = () => {
    const storageRef = ref(storage, `/images/${Date.now()}${images.name}`)
    const uploadImage = uploadBytesResumable(storageRef, images)

    uploadImage.on(
      'state_changed',
      snapshot => {
        const progressPercent =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progressPercent)
      },
      err => {
        console.log(err)
      },
      test => {
        console.log(test)
        setTitle('')
        getDownloadURL(uploadImage.snapshot.ref).then(url => {
          console.log('test', uploadImage)
          addDoc(postsCollectionRef, {
            title,
            postText,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            author: {
              name: auth.currentUser.displayName,
              id: auth.currentUser.uid
            }
          })
            .then(() => {
              toast('Article added succes', { type: 'success' })
              setProgress(0)
            })
            .catch(err => {
              toast('Error occured', { type: 'error' })
              console.log(err)
            })
          setEndsubmit(true)
        })
      }
    )
  }

  return (
    <div className='createPostPage'>
      <div className='cpContainer'>
        <h1>Create A Post</h1>
        <div className='inputGp'>
          <label>Title:</label>
          <input
            placeholder='Title...'
            onChange={e => {
              setTitle(e.target.value)
            }}
          />
        </div>
        <div className='inputGp'>
          <label>Post:</label>
          <textarea
            placeholder='Post...'
            onChange={e => {
              setPostText(e.target.value)
            }}
          />
        </div>

        <label htmlFor=''>Image</label>
        <input
          type='file'
          name='image'
          accept='image/*'
          onChange={e => handleImageChanged(e)}
        />

        {progress === 0 ? null : (
          <div
            className='progress-bar'
            style={{ width: `${progress}%`, height: '12px', background: 'red' }}
          >
            Uploading image : {progress}%
          </div>
        )}

        {endSubmit === false ? (
          <button onClick={createPost}>Submit Post</button>
        ) : (
          <Link to='/'>Home</Link>
        )}
      </div>
    </div>
  )
}

export default CreatePost

// await addDoc(postsCollectionRef, {
//   title,
//   postText,
//   author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
//   images,
//   createdAt: Timestamp.now().toDate()
// })

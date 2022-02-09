import { useEffect, useState } from 'react'
import { getDocs, collection, deleteDoc, doc } from '@firebase/firestore'
import { db, auth } from '../firebase-config'

const Home = ({ isAuth }) => {
  const [postLists, setPostLists] = useState([])
  const postsCollectionRef = collection(db, 'posts')

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef)
      setPostLists(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }
    getPosts()
  }, [])

  const deletePost = async id => {
    const postDoc = doc(db, 'posts', id)
    await deleteDoc(postDoc)
  }

  return (
    <div className='homePage'>
      {postLists.map((post, i) => (
        <div key={i} className='post'>
          <div className='postHeader'>
            <div className='title'>
              <h1>{post.title}</h1>
            </div>
            <div className='deletePost'>
              {isAuth && post.author.id === auth.currentUser.uid && (
                <button
                  onClick={() => {
                    deletePost(post.id)
                  }}
                >
                  X
                </button>
              )}
            </div>
          </div>
          <div className='postTextContainer'>
            {post.postText}
            <h3>@{post.author.name}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home

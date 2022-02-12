import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot } from '@firebase/firestore'
import { db, auth } from '../firebase-config'

const Home = ({ isAuth }) => {
  const [postLists, setPostLists] = useState([])

  useEffect(() => {
    const postsCollectionRef = collection(db, 'posts')
    onSnapshot(postsCollectionRef, snapshot => {
      setPostLists(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
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
          <div className='postTextContainer'>{post.postText}</div>
          {post.imageUrl && <img src={post.imageUrl} />}
          <h3>@{post.author.name}</h3>
          {post.createdAt && <p>{post.createdAt.toDate().toDateString()}</p>}
        </div>
      ))}
    </div>
  )
}

export default Home

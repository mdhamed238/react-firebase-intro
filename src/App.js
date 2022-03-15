import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Post from './components/post';
import { db } from './Firebase/firebase'
import { collection, query, doc, addDoc, deleteDoc, onSnapshot } from 'firebase/firestore'

function App() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({
    title: '',
    body: ''
  })

  useEffect(() => {
    const q = query(collection(db, "posts"))
    onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map(doc => (({
        id: doc.id,
        data: doc.data()
      }))))
      setLoading(false)
    })
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "posts"), {
        title: 'post title',
        body: post.body
      })
    } catch (error) {
      console.log(error)
    }
    setPost({
      title: '',
      body: ''
    })
  }

  const handleDelete = async id => {
    try {
      await deleteDoc(doc(db, "posts", id))
    } catch (error) {
      console.log(error)
    }
  }

  return (

    <>
      <div className="container px-4">
        <h4>Add New Post</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">post title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={post.title}
              onChange={e => setPost({ title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="body" className="form-label">post body</label>
            <input
              type="text"
              className="form-control"
              id="body"
              value={post.body}
              onChange={e => setPost({ body: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
        <div className="row gy-3 mt-3">
          {
            loading ? "Loading ..." :
              posts.map(post => (
                <Post
                  key={post.id}
                  title={post.data.title}
                  body={post.data.body}
                  onDelete={() => handleDelete(post.id)}
                />
              ))
          }
        </div>
      </div>
    </>
  );
}

export default App;

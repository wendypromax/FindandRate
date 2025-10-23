import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { POSTS } from '../../Data/posts'
import toast from 'react-hot-toast'

export default function CreatePost() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPost = {
      id: POSTS.length + 1,
      title,
      author,
      date: new Date().toISOString().split('T')[0],
      excerpt: content.slice(0, 60) + '...',
      content,
      category: 'Nuevo',
    }

    POSTS.push(newPost)

    // ✅ Mostrar notificación bonita
    toast.success('🎉 ¡Tu post ha sido publicado correctamente!')

    // Redirigir al blog después de un pequeño delay
    setTimeout(() => navigate('/blog'), 1500)
  }

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-lg border border-pink-200">
        <Link to="/blog" className="text-pink-500 hover:text-pink-600 text-sm">
          ⬅ Volver al Blog
        </Link>

        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
          Crear nuevo post ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Título</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Ejemplo: Lugares mágicos de mi ciudad"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Autor</label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Contenido</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="5"
              className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Escribe aquí tu experiencia o recomendación..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold py-3 rounded-lg hover:bg-pink-600 transition shadow"
          >
            📤 Publicar Post
          </button>
        </form>
      </div>
    </div>
  )
}
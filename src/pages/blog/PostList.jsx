import { useState } from 'react'
import { Link } from 'react-router-dom'
import { POSTS } from '../../Data/posts'

export default function PostList() {
  const [search, setSearch] = useState('')

  // Filtrar posts por título o autor
  const filteredPosts = POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-md p-8 border border-pink-200">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
            📚 Blog de Find & Rate
          </h1>

          {/* Botón para crear nuevo post */}
          <Link
            to="/blog/create"
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow transition"
          >
            📝 Crear nuevo post
          </Link>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍 Buscar por título o autor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700"
          />
        </div>

        {/* Lista de posts */}
        {filteredPosts.length > 0 ? (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="border border-pink-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white"
              >
                <h2 className="text-2xl font-semibold text-pink-600">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  ✍️ <strong>{post.author}</strong> — {post.date}
                </p>
                <p className="text-gray-700 mb-3">{post.excerpt}</p>
                <Link
                  to={`/blog/post/${post.id}`}
                  className="text-pink-500 hover:text-pink-700 font-medium transition"
                >
                  Leer más →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            😕 No se encontraron posts que coincidan con la búsqueda.
          </p>
        )}
      </div>
    </div>
  )
}
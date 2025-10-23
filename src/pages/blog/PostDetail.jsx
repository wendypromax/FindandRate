import { useParams, Link } from 'react-router-dom'
import { getPostById } from '../../Data/posts'

export default function PostDetail() {
  const { id } = useParams()
  const post = getPostById(id)

  if (!post)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-gray-600">
        <h2 className="text-2xl font-semibold mb-4">😢 Post no encontrado</h2>
        <Link
          to="/blog"
          className="text-pink-500 hover:text-pink-700 transition font-medium"
        >
          ⬅ Volver al blog
        </Link>
      </div>
    )

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white border border-pink-200 rounded-3xl shadow-lg p-8">
        {/* Botón volver */}
        <Link
          to="/blog"
          className="inline-block mb-6 text-pink-500 font-medium hover:text-pink-700 transition"
        >
          ⬅ Volver al blog
        </Link>

        {/* Título */}
        <h1 className="text-3xl font-bold text-pink-600 mb-2">{post.title}</h1>

        {/* Autor y fecha */}
        <p className="text-sm text-gray-500 mb-4">
          ✍️ <strong>{post.author}</strong> — {post.date}
        </p>

        {/* Categoría */}
        <span className="inline-block bg-pink-100 text-pink-600 text-sm font-medium px-3 py-1 rounded-full mb-6">
          {post.category}
        </span>

        {/* Contenido */}
        <div className="text-gray-700 leading-relaxed">
          {post.content}
        </div>
      </div>
    </div>
  )
}
// Google Books API helper functions

export interface BookInfo {
  title: string
  author: string
  genre: string
  isbn?: string
  thumbnail?: string
  description?: string
  publishedDate?: string
}

interface GoogleBooksResponse {
  items?: Array<{
    volumeInfo: {
      title: string
      authors?: string[]
      categories?: string[]
      description?: string
      publishedDate?: string
      industryIdentifiers?: Array<{
        type: string
        identifier: string
      }>
      imageLinks?: {
        thumbnail?: string
        smallThumbnail?: string
      }
    }
  }>
}

// ジャンルのマッピング（Google Booksのカテゴリをシンプルなジャンルにマップ）
const genreMapping: { [key: string]: string } = {
  'Fiction': '文学',
  'History': '歴史',
  'Science': '科学',
  'Philosophy': '哲学',
  'Psychology': '心理学',
  'Business & Economics': 'ビジネス',
  'Self-Help': '自己啓発',
  'Biography & Autobiography': '伝記',
  'Computers': 'IT・コンピュータ',
  'Art': '芸術',
  'Religion': '宗教',
  'Social Science': '社会科学',
  'Medical': '医学',
  'Education': '教育',
  'Cooking': '料理',
  'Travel': '旅行'
}

export async function searchBookInfo(query: string): Promise<BookInfo | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY

  if (!apiKey) {
    console.warn('Google Books API key not found. Using demo data.')
    return getDemoBookInfo(query)
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=1&langRestrict=ja`
    )

    const data: GoogleBooksResponse = await response.json()

    if (!data.items || data.items.length === 0) {
      return getDemoBookInfo(query)
    }

    const book = data.items[0].volumeInfo
    const category = book.categories?.[0] || 'その他'
    const genre = Object.entries(genreMapping).find(([key]) => 
      category.includes(key)
    )?.[1] || category

    return {
      title: book.title,
      author: book.authors?.join(', ') || '著者不明',
      genre: genre,
      isbn: book.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier,
      thumbnail: book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail,
      description: book.description,
      publishedDate: book.publishedDate
    }
  } catch (error) {
    console.error('Error fetching book info:', error)
    return getDemoBookInfo(query)
  }
}

// デモ用の書籍情報
function getDemoBookInfo(query: string): BookInfo {
  const demoBooks: { [key: string]: BookInfo } = {
    'サピエンス全史': {
      title: 'サピエンス全史',
      author: 'ユヴァル・ノア・ハラリ',
      genre: '歴史'
    },
    '銃・病原菌・鉄': {
      title: '銃・病原菌・鉄',
      author: 'ジャレド・ダイアモンド',
      genre: '歴史'
    },
    '利己的な遺伝子': {
      title: '利己的な遺伝子',
      author: 'リチャード・ドーキンス',
      genre: '科学'
    },
    '思考、速いと遅い': {
      title: '思考、速いと遅い',
      author: 'ダニエル・カーネマン',
      genre: '心理学'
    },
    '夜と霧': {
      title: '夜と霧',
      author: 'ヴィクトール・E・フランクル',
      genre: '哲学'
    },
    '罪と罰': {
      title: '罪と罰',
      author: 'ドストエフスキー',
      genre: '文学'
    },
    '1984年': {
      title: '1984年',
      author: 'ジョージ・オーウェル',
      genre: '文学'
    },
    'ホモ・デウス': {
      title: 'ホモ・デウス',
      author: 'ユヴァル・ノア・ハラリ',
      genre: '未来学'
    }
  }

  // クエリに一致する書籍を探す
  const matchedBook = Object.entries(demoBooks).find(([title]) => 
    query.includes(title) || title.includes(query)
  )

  if (matchedBook) {
    return matchedBook[1]
  }

  // 一致しない場合はデフォルトの書籍情報を返す
  return {
    title: query,
    author: '著者不明',
    genre: 'その他'
  }
}

// 複数の書籍情報を一括で取得
export async function searchMultipleBooks(queries: string[]): Promise<BookInfo[]> {
  const bookInfoPromises = queries.map(query => searchBookInfo(query))
  const results = await Promise.all(bookInfoPromises)
  return results.filter((book): book is BookInfo => book !== null)
}
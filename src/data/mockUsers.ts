export interface Book {
  title: string
  author: string
  genre: string
  isbn?: string
}

export interface User {
  id: string
  name: string
  profession: string
  bio: string
  profileImage: string
  books: Book[]
  interests: string[]
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: '佐藤教授',
    profession: '哲学研究者',
    bio: '東京大学で西洋哲学を教えています。カントとニーチェの研究を中心に、現代社会における哲学の意義を探求しています。',
    profileImage: '/avatars/professor.jpg',
    books: [
      { title: '純粋理性批判', author: 'イマヌエル・カント', genre: '哲学' },
      { title: 'ツァラトゥストラはこう語った', author: 'フリードリヒ・ニーチェ', genre: '哲学' },
      { title: '善の研究', author: '西田幾多郎', genre: '哲学' },
      { title: '存在と時間', author: 'マルティン・ハイデガー', genre: '哲学' },
      { title: 'サピエンス全史', author: 'ユヴァル・ノア・ハラリ', genre: '歴史' },
      { title: '利己的な遺伝子', author: 'リチャード・ドーキンス', genre: '科学' },
      { title: '夜と霧', author: 'ヴィクトール・E・フランクル', genre: '哲学' },
      { title: '論理哲学論考', author: 'ルートヴィヒ・ウィトゲンシュタイン', genre: '哲学' },
      { title: '精神現象学', author: 'ゲオルク・ヴィルヘルム・フリードリヒ・ヘーゲル', genre: '哲学' },
      { title: '人間の条件', author: 'ハンナ・アーレント', genre: '哲学' }
    ],
    interests: ['哲学', '倫理学', '認識論', '形而上学', '現代思想']
  },
  {
    id: '2',
    name: '田中司書',
    profession: '図書館司書・文学愛好家',
    bio: '地域図書館で20年間司書として働いています。日本文学から海外文学まで幅広く読み、読書会の主催も行っています。',
    profileImage: '/avatars/librarian.jpg',
    books: [
      { title: '吾輩は猫である', author: '夏目漱石', genre: '文学' },
      { title: 'ノルウェイの森', author: '村上春樹', genre: '文学' },
      { title: '罪と罰', author: 'フョードル・ドストエフスキー', genre: '文学' },
      { title: '1984年', author: 'ジョージ・オーウェル', genre: '文学' },
      { title: '百年の孤独', author: 'ガブリエル・ガルシア・マルケス', genre: '文学' },
      { title: '源氏物語', author: '紫式部', genre: '文学' },
      { title: 'カラマーゾフの兄弟', author: 'フョードル・ドストエフスキー', genre: '文学' },
      { title: '銃・病原菌・鉄', author: 'ジャレド・ダイアモンド', genre: '歴史' },
      { title: 'サピエンス全史', author: 'ユヴァル・ノア・ハラリ', genre: '歴史' },
      { title: '思考、速いと遅い', author: 'ダニエル・カーネマン', genre: '心理学' }
    ],
    interests: ['日本文学', '世界文学', '古典', '現代小説', '読書会']
  },
  {
    id: '3',
    name: '山田医師',
    profession: '内科医・医学研究者',
    bio: '大学病院で内科医として勤務しながら、最新の医学研究にも携わっています。医学以外にも科学全般に強い関心があります。',
    profileImage: '/avatars/doctor.jpg',
    books: [
      { title: 'ハリソン内科学', author: 'デニス・L・カスパー他', genre: '医学' },
      { title: 'がん‐4000年の歴史', author: 'シッダールタ・ムカジー', genre: '医学' },
      { title: '利己的な遺伝子', author: 'リチャード・ドーキンス', genre: '科学' },
      { title: 'ホモ・デウス', author: 'ユヴァル・ノア・ハラリ', genre: '未来学' },
      { title: '夜と霧', author: 'ヴィクトール・E・フランクル', genre: '哲学' },
      { title: '生命とは何か', author: 'エルヴィン・シュレーディンガー', genre: '科学' },
      { title: 'サピエンス全史', author: 'ユヴァル・ノア・ハラリ', genre: '歴史' },
      { title: '思考、速いと遅い', author: 'ダニエル・カーネマン', genre: '心理学' },
      { title: 'ゲノムが語る23の物語', author: 'マット・リドレー', genre: '科学' },
      { title: '免疫の意味論', author: '多田富雄', genre: '医学' }
    ],
    interests: ['医学', '生物学', '遺伝学', '科学哲学', '医療倫理']
  }
]

// 共通書籍を見つける関数
export function findCommonBooks(userBooks: Book[], targetUserBooks: Book[]): Book[] {
  return userBooks.filter(book => 
    targetUserBooks.some(targetBook => 
      targetBook.title === book.title && targetBook.author === book.author
    )
  )
}

// おすすめ書籍を見つける関数（相手が持っていて自分が持っていない本）
export function findRecommendedBooks(userBooks: Book[], targetUserBooks: Book[]): Book[] {
  return targetUserBooks.filter(targetBook => 
    !userBooks.some(book => 
      book.title === targetBook.title && book.author === targetBook.author
    )
  )
}
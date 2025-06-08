// Google Cloud Vision API helper functions

interface VisionAPIResponse {
  responses: Array<{
    textAnnotations?: Array<{
      description: string
      boundingPoly: {
        vertices: Array<{ x: number; y: number }>
      }
    }>
    error?: {
      code: number
      message: string
    }
  }>
}

export async function detectTextFromImage(imageBase64: string): Promise<string[]> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_VISION_API_KEY

  if (!apiKey) {
    console.warn('Google Cloud Vision API key not found. Using demo data.')
    // デモ用のダミーデータを返す
    return [
      'サピエンス全史',
      '銃・病原菌・鉄',
      '利己的な遺伝子',
      '思考、速いと遅い',
      '夜と霧',
      '罪と罰',
      '1984年',
      'ホモ・デウス'
    ]
  }

  try {
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
              },
              features: [
                {
                  type: 'TEXT_DETECTION',
                  maxResults: 50,
                },
              ],
            },
          ],
        }),
      }
    )

    const data: VisionAPIResponse = await response.json()

    if (data.responses[0]?.error) {
      throw new Error(data.responses[0].error.message)
    }

    const textAnnotations = data.responses[0]?.textAnnotations || []
    
    // 最初の要素は全体のテキストなので、個別の単語を抽出
    const detectedTexts = textAnnotations
      .slice(1)
      .map(annotation => annotation.description)
      .filter(text => text.length > 2) // 短すぎるテキストは除外

    return detectedTexts
  } catch (error) {
    console.error('Error detecting text:', error)
    // エラー時はデモデータを返す
    return [
      'サピエンス全史',
      '銃・病原菌・鉄',
      '利己的な遺伝子',
      '思考、速いと遅い',
      '夜と霧',
      '罪と罰',
      '1984年',
      'ホモ・デウス'
    ]
  }
}
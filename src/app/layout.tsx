import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "知的遺産継承プラットフォーム",
  description: "本棚の写真から書籍を自動認識し、読書傾向を分析。同じ興味を持つ人とのマッチングを通じて、大切な人の知的遺産を未来につなぐプラットフォーム。",
  keywords: ["本棚", "読書", "知的遺産", "コミュニティ", "マッチング"],
  openGraph: {
    title: "知的遺産継承プラットフォーム",
    description: "大切な人の知的遺産を、未来につなぐ",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

import Image from "next/image";
import { formatDate } from "@/utils/formatterDate";
import { ArrowLeftIcon } from "lucide-react";

interface ArticleLayoutProps {
  article: {
    titulo: string;
    descricao: string;
    datas?: string[];
    local?: string;
    image?: string;
  };
  backButtonText?: string;
  onBack?: () => void;
}

export function ArticleLayout({ article, backButtonText = "Voltar", onBack }: ArticleLayoutProps) {
  return (
    <main className="flex-1 py-8 md:py-12 lg:py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-10">
        {onBack && (
            <div className="mt-2 mb-4 pb-4">
              <button
                onClick={onBack}
                className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" /> 
                 <span className="text-sm font-medium">{backButtonText}</span> 
              </button>
            </div>
          )}
          <h2 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-gray-50 leading-tight sm:text-5xl">
            {article.titulo}
          </h2>

          <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
            {article.datas && article.datas.length > 0 && (
              <p>
                <strong>Data(s):</strong> {article.datas.map(formatDate).join(", ")}
              </p>
            )}
            {article.local && (
              <p>
                <strong>Local:</strong> {article.local}
              </p>
            )}
          </div>
          {article.image && (
            <div className="relative w-full h-72 md:h-[450px] mb-10 rounded-lg overflow-hidden shadow-md">
              <Image
                src={article.image}
                alt={article.titulo}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            {article.descricao}
          </p>

        </article>
      </div>
    </main>
  );
} 
'use client';

import { useState } from 'react';

interface ProductData {
  name: string;
  image: string;
  nutriscore: string;
  novaGroup: number;
  sugarLevel: string;
  additives: string[];
  humanizedAlerts: string[];
}

// Função de utilidade para traduzir termos específicos do backend
const traduzirBackend = (texto: string) => {
  return texto
    .replace("Ultra-processed product. Highly engineered for repeated consumption.", "⚠️ Produto ultraprocessado. Altamente modificado para estimular o consumo repetido.")
    .replace("High sugar concentration. Watch out for spikes in glucose.", "🩸 Alta concentração de açúcar. Cuidado com picos de glicose.")
    .replace("Chemical cocktail: Contains a high amount of industrial additives.", "🧪 Coquetel químico: Contém alta quantidade de aditivos industriais.")
    .replace("moderate", "moderado")
    .replace("high", "alto");
};

export default function page() {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!barcode) return; // 'barcode' agora funciona como o input geral

  setLoading(true);
  setError('');
  setProduct(null);

  try {
    // Expressão regular simples para testar se o texto contém apenas números
    const isBarcode = /^\d+$/.test(barcode.trim());
    
    let url = `https://verita-jsor.onrender.com/api/product/${barcode.trim()}`;
    
    // Se NÃO for apenas números, muda a rota para a nossa nova busca por nome
    if (!isBarcode) {
      url = `https://verita-jsor.onrender.com/api/product/search?name=${encodeURIComponent(barcode.trim())}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error('Produto não encontrado ou erro no servidor.');
    
    const data = await response.json();
    
    if (data.humanizedAlerts && data.humanizedAlerts.includes("Product not found in database.")) {
      setError('Produto não encontrado na base de dados.');
    } else {
      setProduct(data);
    }
  } catch (err) {
    setError('Falha ao conectar à API Verita. Certifique-se de que o backend Java está rodando.');
  } finally {
    setLoading(false);
  }
};

  return (
    // Centralização total do layout
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#09090b] text-zinc-100">
      
      {/* Cabeçalho do App com hierarquia visual */}
      <div className="text-center mb-12 max-w-xl">
        <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-4">
          Verita
        </h1>
        {/* SLOGAN GRANDE E EM PORTUGUÊS (Pediu Título Grande) */}
        <p className="text-zinc-400 text-2xl font-semibold leading-snug">
          “Descubra o que os rótulos de alimentos escondem.”
        </p>
      </div>

      {/* Formulário de Input e Botão - Melhor estilizados */}
      <form onSubmit={handleAnalyze} className="w-full max-w-lg flex flex-col sm:flex-row gap-3 mb-16 shadow-2xl shadow-emerald-950/10">
        <input
          type="text"
          placeholder="Digite o código de barras ou o nome do produto..."
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="flex-1 px-5 py-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl focus:outline-none focus:border-emerald-500 transition-colors text-zinc-200 placeholder-zinc-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-semibold rounded-2xl transition-colors shadow-lg whitespace-nowrap"
        >
          {loading ? 'Analisando...' : 'Analisar'}
        </button>
      </form>

      {/* Alerta de Erro */}
      {error && (
        <div className="bg-red-950/30 border border-red-900 text-red-300 px-5 py-4 rounded-xl max-w-lg w-full text-center mb-6">
          🛑 {error}
        </div>
      )}

      {/* Painel de Resultados - APRESENTÁVEL E PREMIUM */}
      {product && (
        <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 backdrop-blur-sm animate-fade-in shadow-2xl">
          
          {/* SEÇÃO INSIGHTS VERITA - O Coração do App (AGORA NO TOPO E EM VERMELHO) */}
          <div className="mb-10 text-center">
            <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-5">
              Insights Verita: A Verdade Revelada
            </h3>
            <div className="flex flex-col gap-4">
              {product.humanizedAlerts.map((alert, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-red-950/20 border border-red-900 rounded-2xl text-zinc-200 flex items-center justify-center gap-4 text-center"
                >
                  <p className="text-sm leading-relaxed font-semibold">
                    {traduzirBackend(alert)}
                  </p>
                </div>
              ))}
              {product.humanizedAlerts.length === 0 && (
                <p className="text-zinc-400 text-sm italic">Nenhuma manipulação crítica detectada com base nos filtros principais.</p>
              )}
            </div>
          </div>

          {/* Seção da Imagem e Nome do Produto */}
          <div className="flex flex-col md:flex-row gap-8 items-center border-b border-zinc-800 pb-8 mb-8">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-44 h-44 object-contain bg-white rounded-3xl p-4 border border-zinc-700 shadow-md"
              />
            )}
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold text-zinc-100 mb-3">{product.name}</h2>
              
              {/* Pontuação de Saúde - Centralizado e em Português */}
              <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
                <span className="px-4 py-1.5 bg-zinc-800 text-xs font-semibold rounded-full text-zinc-300 border border-zinc-700">
                  Nutriscore: <span className="font-bold text-amber-400">{product.nutriscore}</span>
                </span>
                <span className={`px-4 py-1.5 text-xs font-semibold rounded-full ${
                  product.novaGroup === 4 ? 'bg-red-950 text-red-300 border border-red-900' : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                }`}>
                  Grupo NOVA: <span className="font-bold">{product.novaGroup}</span>
                </span>
                {product.sugarLevel && (
                  <span className={`px-4 py-1.5 text-xs font-semibold rounded-full ${
                    product.sugarLevel === "high" ? 'bg-red-950 text-red-300 border border-red-900' : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                  }`}>
                    Açúcar: <span className="font-bold">{traduzirBackend(product.sugarLevel)}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>
      )}
    </main>
  );
}
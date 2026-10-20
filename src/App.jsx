
import { useState } from 'react'
import './App.css'
import Ordem from './components/Ordem'

function App() {
  const [ordens, setOrdens] = useState([
    {
      idOrdem: crypto.randomUUID(),
      dsCliente: 'Marina Alvez',
      dsServico: 'Troca de freios',
      nuValor: 85,
      fgConcluida: true
    },
    {
      idOrdem: crypto.randomUUID(),
      dsCliente: 'Juliano Carvalho',
      dsServico: 'Troca de pedal',
      nuValor: 40,
      fgConcluida: false
    },
    {
      idOrdem: crypto.randomUUID(),
      dsCliente: 'Ana Souza',
      dsServico: 'Revisão geral',
      nuValor: 150,
      fgConcluida: false
    }
  ])

  const [dsCliente, setDsCliente] = useState('')
  const [dsServico, setDsServico] = useState('')
  const [nuValor, setNuValor] = useState('')
  const [erro, setErro] = useState('')

  function cadastrarOrdem(event) {
    event.preventDefault()

    const cliente = dsCliente.trim()
    const servico = dsServico.trim()
    const valorTexto = String(nuValor).trim()
    const valor = Number(valorTexto)

    if (cliente === '' || servico === '') {
      setErro('Preencha o cliente e o serviço.')
      return
    }

    if (
      valorTexto === '' ||
      !Number.isFinite(valor) ||
      valor < 0
    ) {
      setErro('Informe um valor válido, maior ou igual a zero.')
      return
    }

    const novaOrdem = {
      idOrdem: crypto.randomUUID(),
      dsCliente: cliente,
      dsServico: servico,
      nuValor: valor,
      fgConcluida: false
    }

    setOrdens((listaAtual) => [
      ...listaAtual,
      novaOrdem
    ])

    setDsCliente('')
    setDsServico('')
    setNuValor('')
    setErro('')
  }

  function alternarConclusao(idOrdem) {
    setOrdens((listaAtual) =>
      listaAtual.map((ordem) =>
        ordem.idOrdem === idOrdem
          ? {
              ...ordem,
              fgConcluida: !ordem.fgConcluida
            }
          : ordem
      )
    )
  }

  function removerOrdem(idOrdem) {
    setOrdens((listaAtual) =>
      listaAtual.filter(
        (ordem) => ordem.idOrdem !== idOrdem
      )
    )
  }

  const totalOrdens = ordens.length
  const ordensAbertas = ordens.filter(
    (ordem) => ordem.fgConcluida === false
  )
  const quantidadeAbertas = ordensAbertas.length
  const valorEmAberto = ordensAbertas.reduce(
    (total, ordem) => total + ordem.nuValor,
    0
  )

  return (
    <main className="App">
      <header className="cabecalho">
        <h1>Oficina de Bicicletas</h1>
        <p>Controle de ordens de serviço</p>
      </header>

      <section className="resumo">
        <article className="resumo-card">
          <h2>Total de ordens</h2>
          <p>{totalOrdens}</p>
        </article>

        <article className="resumo-card">
          <h2>Ordens em aberto</h2>
          <p>{quantidadeAbertas}</p>
        </article>

        <article className="resumo-card">
          <h2>Valor em aberto</h2>
          <p>
            {valorEmAberto.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </p>
        </article>
      </section>

      <section className="cadastro">
        <h2>Nova ordem de serviço</h2>

        <form onSubmit={cadastrarOrdem}>
          <label htmlFor="cliente">
            Nome do cliente
          </label>

          <input
            id="cliente"
            type="text"
            value={dsCliente}
            onChange={(event) =>
              setDsCliente(event.target.value)
            }
          />

          <label htmlFor="servico">
            Serviço solicitado
          </label>

          <input
            id="servico"
            type="text"
            value={dsServico}
            onChange={(event) =>
              setDsServico(event.target.value)
            }
          />

          <label htmlFor="valor">
            Valor do serviço (R$)
          </label>

          <input
            id="valor"
            type="number"
            min="0"
            step="any"
            value={nuValor}
            onChange={(event) =>
              setNuValor(event.target.value)
            }
          />

          {erro !== '' && (
            <p className="mensagem-erro">
              {erro}
            </p>
          )}

          <button type="submit">
            Cadastrar ordem
          </button>
        </form>
      </section>

      <section className="listagem">
        <h2>Ordens de serviço</h2>

        {ordens.length === 0 ? (
          <p className="lista-vazia">
            Não há ordens cadastradas.
          </p>
        ) : (
          <div className="lista-ordens">
            {ordens.map((ordem) => (
              <Ordem
                key={ordem.idOrdem}
                ordem={ordem}
                onAlternarConclusao={alternarConclusao}
                onRemover={removerOrdem}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default App

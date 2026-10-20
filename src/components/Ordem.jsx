
import './Ordem.css'

function Ordem({
  ordem,
  onAlternarConclusao,
  onRemover
}) {
  return (
    <article
      className={
        ordem.fgConcluida
          ? 'ordem concluida'
          : 'ordem'
      }
    >
      <div className="ordem-conteudo">
        <h3>{ordem.dsCliente}</h3>

        <p>
          <strong>Serviço:</strong> {ordem.dsServico}
        </p>

        <p>
          <strong>Valor:</strong>{' '}
          {ordem.nuValor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </p>

        {ordem.fgConcluida && (
          <span className="selo-concluida">
            Concluída
          </span>
        )}
      </div>

      <div className="ordem-acoes">
        <button
          type="button"
          className="botao-concluir"
          onClick={() =>
            onAlternarConclusao(ordem.idOrdem)
          }
        >
          {ordem.fgConcluida
            ? 'Reabrir'
            : 'Concluir'}
        </button>

        <button
          type="button"
          className="botao-remover"
          onClick={() => onRemover(ordem.idOrdem)}
        >
          Remover
        </button>
      </div>
    </article>
  )
}

export default Ordem

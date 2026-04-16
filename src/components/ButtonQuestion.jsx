

export default function ButtonQuestion( {questoes, onOpen, modalOpen, bloqueada, solu} ) {
    const queID = ` dialog-${questoes.id}`
    const baseIcon = "questao.icon". icon??"cute.png";
    const icon = bloqueada ? "padlock.png" :solu ? "check.png" : baseIcon;
    
    const aria = bloqueada
    ? ` ${questoes.titulo} (bloqueada, resolva as anteriores para desbloquear)`
    : solu
    ? ` {questoes.titulo} (resolvida)`
    : ` {questoes.titulo} (disponivel)`;

    return(
        <li className = "icon-grid-item">
            <button
            type = "button"
            className ={` icon-button ${bloqueada ?? " icon-button--locked"}
            ${solu ?? "icon-button--solved"}`}
            aria-haspopup = "dialog"
            aria-controls={queID}
            aria-label = {aria}
            aria-disabled = {bloqueada || undefined}
            onClick={() => onOpen(quetoes)}
            disabled = {bloqueada}
            >
                <img className="icon-button-img " aria-hidden= "true" src={icon} alt={` imagem de um ${icon}`}/>
                <span className="visuall-hidden"> {questoes.titulo} </span>
            </button>

        </li>
    )
}
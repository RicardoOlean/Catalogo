import QUESTOES from "../../public/data/perguntas.json";
import "./fases.css";
import { useState } from "react";
import { useMemo } from "react";

export default function Fases() {
    const [selecionada, setSelecionada] = useState(null);
    const [trancada, setTrancada] = useState(0);
    const [resolvidas, setResolvidas] = useState(() => new Set());
    const total = QUESTOES.length;

    const handleOpen = (q) => selecionada(q);
    const handleClose = () => selecionada(null);

    const hendleCorrect = (id) => {
        setResolvidas((prev) => {
            const next = new Set(prev);
            next.add(id);
            return next;
        });
        const idx = QUESTOES.findIndex((q) => q.id === id);
        if (idx > -1 && idx < QUESTOES.length - 1) {
            setTrancada((prev) => Math.max(prev, idx + 1));
        }
    }
    const progresso = useMemo(() => {
        const perguntasResolvidas = resolvidas.size;

        const porcentagem = Math.round((perguntasResolvidas / total) * 100);
        return {
            resolvida: perguntasResolvidas,
            total: total,
            porcentagem: porcentagem,
        };
    }, [resolvidas, total]);

    return (
        <main className="questoes">
            <header className="q-header">
                <h1 className=" q-title">Caça Talentos</h1>
                <p className="q-subtitle">Descubra quem é o jogador</p>
                <div className="progresso">
                    <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valeumin={0}
                        aria-valuemax={100}
                        aria-vluenow={progresso.porcentagem}
                        arial-label={` Progresso: ${progresso.resolvida} de ${progresso.total}resolvidas`}
                        style={{ width: `${progresso.porcentagem}%` }} />
                    <span className="progress-label">
                        {progresso.resolvida}/{progresso.total}
                    </span>


                </div>
            </header>
        </main>

    )


}
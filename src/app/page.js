"use client"

import { useState } from "react";

export default function Page() {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");

  const salvarDados = async (event) => {
    try {
      event.preventDefault();
      const resposta = await fetch("api/alunos", {
        method: "POST",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify({ nome: nome, matricula: matricula, curso: curso })
      });

      if(resposta.ok){
        alert("Deu certo, show na bagaça")
      }

    } catch (err) {
      return console.error("Deu erro na bagaça ", err);
    }
  }

  return (
    <main>
      <form onSubmit={salvarDados}>
        <input 
          type="text"
          placeholder="Digite o nome" 
          onChange={(event) => setNome(event.target.value)} 
        />

        <input
          type="number"
          placeholder="Digite a matrícula"
          onChange={(event) => setMatricula(event.target.value)}
        />

        <input
          type="text"
          placeholder="Digite o curso"
          onChange={(event) => setCurso(event.target.value)}
        />
        
        <button>Salvar</button>
      </form>
    </main>
  );
}

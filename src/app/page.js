"use client"

import { useState } from "react";
import '../styles/homePage.css'

export default function Page() {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState(0);

  const registerNewBooks = async (event) => {
    try {
      event.preventDefault();
      const resposta = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify({ bookName: bookName, author: author, gender: gender, price: price })
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
      <header>
        <h1>Bem vindos a loja de livros</h1>
      </header>

      <form onSubmit={registerNewBooks}>
        <input 
          type="text"
          placeholder="Digite o nome do livro" 
          onChange={(event) => setBookName(event.target.value)} 
        />

        <input
          type="text"
          placeholder="Informe o autor"
          onChange={(event) => setAuthor(event.target.value)}
        />

        <input
          type="text"
          placeholder="Informe o gênero"
          onChange={(event) => setGender(event.target.value)}
        />

        <input
          type="number"
          placeholder="Informe o preço"
          onChange={(event) => setPrice(event.target.value)}
        />
        
        <button id="submitButton">Salvar</button>
      </form>
    </main>
  );
}

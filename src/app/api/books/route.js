import { NextResponse } from "next/server";
import { getBooksCollection } from "./mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const collection = await getBooksCollection();
    const books = await collection.find().toArray();
    return NextResponse.json(books);
  } catch (err) {
    console.error("Erro no GET:", err);
    return NextResponse.json({ error: "Erro ao buscar livros" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const collection = await getBooksCollection();
    const { bookName, author, gender, price } = await req.json();

    if (!bookName || !author || !gender || !price) {
      return NextResponse.json(
        { error: "Preencha todos os dados" },
        { status: 400 }
      );
    }

    const response = await collection.insertOne({
      bookName,
      author,
      gender,
      price,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Livro cadastrado com sucesso!", id: response.insertedId },
      { status: 201 }
    );
  } catch (err) {
    console.error("Erro no POST:", err);
    return NextResponse.json({ error: "Erro ao cadastrar livro" }, { status: 500 });
  }
}

export async function PUT(req){

  try {
    const { id, bookName, author, gender, price} = await req.json();
    const collection = await getBooksCollection();
    const result = await collection.updateOne({_id: ObjectId.createFromHexString(id)}, {$set: {bookName, author, gender, price}});
  
    return NextResponse.json({ message: "Livro alterado com sucesso!"}, { status: 201 });
  } catch (err) {
    console.error("Erro no PUT: ", err)
    return NextResponse.json({ error: "Erro ao atualizar livro" }, { status: 500 });
  }

}

export async function DELETE(req){
  try {
    const { id } = await req.json();
    const collection = await getBooksCollection();

    const result = await collection.deleteOne({_id: ObjectId.createFromHexString(id)})

    return NextResponse.json({ message: "Livro removido com sucesso !" }, { status: 201 })
  } catch (err) {
    console.error("Erro no DELETE: ", err)
    return NextResponse.json({ error: "Erro ao remover livro do sistema"}, { status: 500 })
  }
}

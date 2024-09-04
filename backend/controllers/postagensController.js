import Posts from "../models/postagensModel.js";
import { z } from "zod";
import formatZodError from "../helpers/zodError.js";

// Validações com ZOD
const createSchema = z.object({
  titulo: z
    .string()
    .min(3, { msg: "É obrigatorio por titulo maior que 3 caracteres " })
    .transform((txt) => txt.toLowerCase()),
  conteudo: z
    .string()
    .min(5, { msg: "A descricao deve ter pelo menos 5 caracteres" }),

});

const getSchema = z.object({
  id: z.string().uuid({msg: "Id do post está inválido"})
})


export const create = async (request, response) => {
    const bodyValidation = createSchema.safeParse(request.body)
    
    if(!bodyValidation.success){
      response.status(400).json({msg: "Os dados recebidos do corpo são invalidos", detalhes: bodyValidation.error})
      return
    }
  
    const { titulo, conteudo,autor,imagem } = request.body;

  
    if (!titulo) {
      response.status(400).json({ err: "A tarefa é obirgatoria" });
      return;
    }
    if (!conteudo) {
      response.status(400).json({ err: "A descricao é obirgatoria" });
      return;
    }
    if (!autor) {
      response.status(400).json({ err: "A descricao é obirgatoria" });
      return;
    }


    // if(!imagem)
    //   imagem = "caminhodefault"
  
    const novopost = {
      titulo,
      conteudo,
      autor,
      imagem,
    };
    try {
      await Posts.create(novopost);
      response.status(201).json({ msg: "Posts Cadastrado" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ Err: "Erro ao cadastrar os posts" });
    }
  };
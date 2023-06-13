import { IMessage } from "../providers/ResendMail/IMailProvider";


const createRegisterBody = (mail: string, password: string): IMessage => {
    const message: IMessage = {
        email: mail,
        subject: 'Seja bem-vindo à plataforma BatCaverna',
        body: `<p>Você já pode fazer login em nossa plataforma. <br> Seus Dados de acesso: <br> Usuário: ${mail} Senha: ${password} </p>`
    };
    return message;
}

export default createRegisterBody;

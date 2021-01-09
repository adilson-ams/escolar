
import * as Yup from 'yup';

const validate = Yup.object().shape({

    nome: Yup.string()
        .required("O campo Nome é obrigatório")
        // .min(5, 'Must be exactly 5 digits')
        .max(50, 'Limite máximo de 50 caractéres.'),

    email: Yup.string()
        .required("O campo E-mail é obrigatório")
        .email("Digite um e-mail válido."),
 

    confsenha: Yup.string()
        .oneOf([Yup.ref('senha'), null], 'Senha não confimada.')
});

export default validate;
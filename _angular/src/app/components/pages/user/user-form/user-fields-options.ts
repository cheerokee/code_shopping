import {FieldsOptions} from "../../../../common/fields-options";

const fieldsOptions: FieldsOptions = {
    name: {
        id: 'name',
        label: 'Nome',
        validationMessage: {
            maxlength: 255
        }
    },
    email: {
        id: 'email',
        label: 'E-mail',
        validationMessage: {
        }
    },
    password: {
        id: 'password',
        label: 'Senha',
        validationMessage: {
        }
    },
    active: {
        id: 'active',
        label: 'Ativo'
    }
};

export default fieldsOptions;

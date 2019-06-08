import {FieldsOptions} from "../../../../common/fields-options";

const fieldsOptions: FieldsOptions = {
    name: {
        id: 'name',
        label: 'Nome',
        validationMessage: {
            maxlength: 255
        }
    },
    description: {
        id: 'description',
        label: 'Descrição',
        validationMessage: {
        }
    },
    price: {
        id: 'price',
        label: 'Preço',
        validationMessage: {
        }
    },
    active: {
        id: 'active',
        label: 'Ativo'
    }
};

export default fieldsOptions;

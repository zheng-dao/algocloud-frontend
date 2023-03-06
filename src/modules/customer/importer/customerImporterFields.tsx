import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';import customerEnumerators from 'src/modules/customer/customerEnumerators';
import moment from 'moment';

export default [
  {
    name: 'name',
    label: i18n('entities.customer.fields.name'),
    schema: schemas.string(
      i18n('entities.customer.fields.name'),
      {
        "required": true,
        "min": 2,
        "max": 255
      },
    ),
  },
  {
    name: 'birthdate',
    label: i18n('entities.customer.fields.birthdate'),
    schema: schemas.date(
      i18n('entities.customer.fields.birthdate'),
      {},
    ),
   render: (value) => value && value instanceof Date ? moment(value).format('YYYY-MM-DD') : value,
  },
  {
    name: 'gender',
    label: i18n('entities.customer.fields.gender'),
    schema: schemas.enumerator(
      i18n('entities.customer.fields.gender'),
      {
        "options": customerEnumerators.gender
      },
    ),
  },
];
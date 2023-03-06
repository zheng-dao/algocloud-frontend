import { useForm, FormProvider } from 'react-hook-form';
import { i18n } from 'src/i18n';
import React, { useState } from 'react';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePickerFormItem from 'src/view/shared/form/items/DatePickerFormItem';

const schema = yup.object().shape({
  description: yupFormSchemas.string(i18n(
    'changeLog.fields.description'),
    {
      required: true,
    }),
  date: yupFormSchemas.date(
    i18n('changeLog.fields.date'),
    { required: true },
  ),
});

function ChangeLogNewForm(props) {
  const { saveLoading } = props;

  const [initialValues] = useState(() => ({
    description: '',
    date: null,
  }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    const { ...data } = values;
    props.onSubmit(data);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-7 col-md-8 col-12">
              <DatePickerFormItem
                name="date"
                label={i18n('changeLog.fields.date')}
                required={true}
              />
            </div>
            <div className="col-lg-7 col-md-8 col-12">
              <TextAreaFormItem
                name="description"
                label={i18n('changeLog.fields.description')}
                required={true}
                autoFocus
              />
            </div>
          </div>

          <div className="form-buttons">
            <button
              className="btn btn-primary"
              disabled={saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
            >
              <ButtonIcon
                loading={saveLoading}
                iconClass="far fa-save"
              />{' '}
              {i18n('common.save')}
            </button>

            <button
              disabled={saveLoading}
              onClick={onReset}
              className="btn btn-light"
              type="button"
            >
              <i className="fas fa-undo"></i>{' '}
              {i18n('common.reset')}
            </button>

            {props.onCancel ? (
              <button
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                className="btn btn-light"
                type="button"
              >
                <i className="fas fa-times"></i>{' '}
                {i18n('common.cancel')}
              </button>
            ) : null}
          </div>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default ChangeLogNewForm;
